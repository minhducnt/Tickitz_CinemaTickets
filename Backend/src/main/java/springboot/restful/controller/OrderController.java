package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.OrderService;
import springboot.restful.service.PaymentService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@Slf4j
@CrossOrigin(origins = "*")
public class OrderController {

	public static final String URL_PAYPAL_SUCCESS = "pay/success";
	public static final String URL_PAYPAL_CANCEL = "pay/cancel";
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private OrderDetailService orderDetailService;

	@PostMapping("")
	public ResponseEntity<?> createNewOrder(@RequestBody List<OrderDetailDTO> orderDetailDTOS) {
		UserDTO userDTO = decodeJwtToUsername();
		OrderDTO orderDTO = orderService.createOrder(orderDetailDTOS);

		HttpSession session = request.getSession(false);
		if (session == null || !request.isRequestedSessionIdValid())
			session = request.getSession();
		session.setAttribute("orderId", orderDTO.getId());
		return ResponseEntity.ok().body(orderDTO);
	}

	@GetMapping("")
	public ResponseEntity<?> getAllOrders() {
		return ResponseEntity.ok().body(orderService.getAllOrders());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getOrderById(@PathVariable int id) {
		return ResponseEntity.ok().body(orderService.getOrderById(id));
	}

	@GetMapping("/users/{idUser}")
	public ResponseEntity<?> getAllOrdersByUser(@PathVariable int idUser) {
		return ResponseEntity.ok().body(orderService.getAllOrdersByUser(idUser));
	}

	private UserDTO decodeJwtToUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		return modelMapper.map(user, UserDTO.class);
	}

	@GetMapping("/{idOrder}/detail")
	public ResponseEntity<?> getAllOrderDetailsByOrder(@PathVariable int idOrder) {
		return ResponseEntity.ok().body(orderDetailService.getOrderDetailsByOrder(idOrder));
	}

	@GetMapping("/detail/{idOrderDetail}")
	public ResponseEntity<?> getOrderDetailsById(@PathVariable int idOrderDetail) {
		return ResponseEntity.ok().body(orderDetailService.getOrderDetailById(idOrderDetail));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteOrderById(@PathVariable int id) {
		orderService.deleteOrder(id);
		return ResponseEntity.ok().body(new ApiRespone(new Date().toLocaleString(),
				"Delete was successfully", true));
		// return new ResponseEntity<ApiRespone>(
		// new ApiRespone(new Date().toLocaleString(), "Order was deleted with id : " +
		// id, true),
		// HttpStatus.OK);
	}

	@GetMapping("/detail/ticket/{idTicket}")
	public ResponseEntity<?> getOrderDetailByTicket(@PathVariable int idTicket) {
		OrderDetailDTO orderDetailDTO = orderDetailService.getOrderDetailsByTicket(idTicket);
		return ResponseEntity.ok().body(orderDetailDTO);
	}

}
