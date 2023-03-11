package springboot.restful.service.implement;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.*;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.OrderDetailDTO;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.repository.OrderRepository;
import springboot.restful.repository.TicketRepository;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.OrderDetailService;
import springboot.restful.service.OrderService;
import springboot.restful.util.ModelMapping;

import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class OrderServiceImp implements OrderService, ModelMapping<Order, OrderDTO> {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private OrderDetailService orderDetailService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TicketRepository ticketRepository;

	// public OrderDTO createOrder(UserDTO userDTO) {
	// Order order = new Order();
	// Date dt = new Date();
	//
	// java.sql.Date date = new java.sql.Date(dt.getTime());
	// Time time = new Time(dt.getTime());
	//
	// User user = modelMapper.map(userDTO, User.class);
	//
	// order.setDate(date);
	// order.setTime(String.valueOf(time));
	// order.setUser(user);
	// order.setTotal(0);
	// order.setPaid(false);
	//
	// OrderDTO orderDTO = entityToDTO(orderRepository.save(order));
	// orderDTO.setUser(userDTO);
	// return orderDTO;
	// }

	@Override
	public OrderDTO createOrder(List<OrderDetailDTO> orderDetailDTOS) {
		int total = 0;
		Order order = new Order();
		User user = decodeFromJwtTokenToUser();
		Date dt = new Date();
		java.sql.Date date = new java.sql.Date(dt.getTime());
		Time time = new Time(dt.getTime());
		order.setDate(date);
		order.setTime(String.valueOf(time));
		order.setUser(user);

		for (OrderDetailDTO od : orderDetailDTOS) {
			total += od.getTicket().getPrice();
		}
		order.setTotal(total);

		// List<OrderDetail> odds = orderDetailDTOS.stream().map(od ->
		// modelMapper.map(od, OrderDetail.class)).collect(Collectors.toList());
		// order.setOrderDetails(odds);

		Order savedOrder = orderRepository.save(order);
		List<OrderDetail> orderDetails = new ArrayList<>();
		orderDetailDTOS.forEach(odd -> {
			OrderDetail orderDetail = modelMapper.map(odd, OrderDetail.class);
			orderDetail.setOrder(savedOrder);
			OrderDetailDTO orderDetailDTO = modelMapper.map(orderDetail, OrderDetailDTO.class);
			orderDetailService.createOrderDetail(orderDetailDTO);
		});
		return entityToDTO(savedOrder);
	}

	private User decodeFromJwtTokenToUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		return user;
	}

	@Override
	public List<OrderDTO> getAllOrders() {
		return orderRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<OrderDTO> getAllOrdersByUser(int idUser) {
		User user = userRepository.findById(idUser)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", idUser));
		List<OrderDTO> orderDTOS = orderRepository.findByUser(user).stream().map(this::entityToDTO)
				.collect(Collectors.toList());
		orderDTOS.forEach(od -> {
			Date date = od.getDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			od.setDate(newDate);
		});
		return orderDTOS;
	}

	@Override
	public OrderDTO getOrderById(int id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		return entityToDTO(order);
	}

	@Override
	public OrderDTO payOrder(int id, boolean isPaid) {
		Order order = dtoToEntity(getOrderById(id));
		order.setPaid(isPaid);
		Date dt = new Date();
		java.sql.Date date = new java.sql.Date(dt.getTime());
		Time time = new Time(dt.getTime());
		order.setDate(date);
		order.setTime(String.valueOf(time));
		List<OrderDetailDTO> orderDetailDTOs = orderDetailService.getOrderDetailsByOrder(id);
		List<Ticket> ticketsByShowTimeAndSeatNotSold = new ArrayList<>();
		for (OrderDetailDTO odd : orderDetailDTOs) {

			//ticket is sold
			TicketDTO ticketDTO = odd.getTicket();
			Ticket updateSoldTicket = modelMapper.map(ticketDTO, Ticket.class);
			updateSoldTicket.setSold(true);
			updateSoldTicket = ticketRepository.save(updateSoldTicket);

			//get showtime + seat
			ShowTime showTime = updateSoldTicket.getShowTime();
			Seat seat = updateSoldTicket.getSeat();
			//get list tickets by showtime + seat to delete
			List<Ticket> tickets = ticketRepository.findByShowTimeAndSeat(showTime, seat);
			// tickets.stream().filter(ticket -> !ticket.isSold()).forEach(ticket -> ticketRepository.delete(ticket));

			//get list tickets is not sold (sold = false) and add to list IdTickets
			tickets.stream().filter(ticket -> ticket.isSold() == false).forEach(ticket -> ticketsByShowTimeAndSeatNotSold.add(ticket));
//			ticketsByShowTimeAndSeatNotSold.forEach(t -> {
//				int idTicket = t.getId();
//				OrderDetailDTO orderDetailDTO = orderDetailService.getOrderDetailsByTicket(idTicket);
//				int idOrder = orderDetailDTO.getId();
//				ticketRepository.delete(t);
//				List<OrderDetailDTO> orderDetailDTOList = orderDetailService.getOrderDetailsByOrder(idOrder);
//				updateOrder(idOrder, orderDetailDTOList);
//			});

//			if (idTickets.isEmpty() || idTickets == null || idTickets.size() == 0) continue;
//
//			for (int t : idTickets) {
//				//get orderDetail by ticket
//				OrderDetailDTO orderDetailDTO = orderDetailService.getOrderDetailsByTicket(t);
//				idOrders.add(orderDetailDTO.getOrder().getId());
//				orderDetailService.deleteOrderDetail(orderDetailDTO);
//				Ticket ticket = ticketRepository.findById(t).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", t));
//				ticketRepository.delete(ticket);

//				if (idOrders.isEmpty() || idOrders == null || idOrders.size() == 0) continue;
//
//				for (int orderID : idOrders) {
//					List<OrderDetailDTO> listOrderDetailDTOs = orderDetailService.getOrderDetailsByOrder(orderID);
//					updateOrder(orderID, orderDetailDTOs);
//				}

//			}
		}

		ticketsByShowTimeAndSeatNotSold.forEach(t -> {
			int idTicket = t.getId();
			OrderDetailDTO orderDetailDTO = orderDetailService.getOrderDetailsByTicket(idTicket);
			int idOrder = orderDetailDTO.getOrder().getId();
			orderDetailService.deleteById(orderDetailDTO.getId());
			ticketRepository.delete(t);
			List<OrderDetailDTO> orderDetailDTOList = orderDetailService.getOrderDetailsByOrder(idOrder);
			updateOrder(idOrder, orderDetailDTOList);
		});

//		orderDetailDTOs.forEach(odd -> {
//
//
//			idTickets.forEach(t -> {
//
//				idOrders.forEach(orderID -> {
//
//				});
//			});
//		});


		return entityToDTO(orderRepository.save(order));
	}

	@Override
	public OrderDTO updateOrder(int id, List<OrderDetailDTO> orderDetailDTOS) {
		int total = 0;
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		for (OrderDetailDTO od : orderDetailDTOS) {
			total += od.getTicket().getPrice();
		}

//		order.setOrderDetails(orderDetails);
		order.setTotal(total);

		orderRepository.save(order);

		return null;
	}

	@Override
	public Order dtoToEntity(OrderDTO orderDTO) {
		return modelMapper.map(orderDTO, Order.class);
	}

	@Override
	public OrderDTO entityToDTO(Order order) {
		return modelMapper.map(order, OrderDTO.class);
	}

	@Override
	public void deleteOrder(int id) {
		Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order", "id", id));
		orderRepository.delete(order);
	}
}
