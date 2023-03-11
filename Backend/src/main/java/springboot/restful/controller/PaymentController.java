package springboot.restful.controller;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import springboot.restful.exception.ApiException;
import springboot.restful.model.payloads.OrderDTO;
import springboot.restful.model.payloads.PaymentMethod;
import springboot.restful.model.payloads.PaypalPaymentIntent;
import springboot.restful.service.OrderService;
import springboot.restful.service.PaymentService;
import springboot.restful.util.Utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@Slf4j
@CrossOrigin(origins = "*")
public class PaymentController {

	public static final String URL_PAYPAL_SUCCESS = "pay/success";
	public static final String URL_PAYPAL_CANCEL = "pay/cancel";
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private OrderService orderService;
	@Autowired
	private HttpServletRequest request;

	@GetMapping("/{id}")
	public String index(Model model, @PathVariable int id) {
		HttpSession session = request.getSession(false);
		if (session == null)
			session = request.getSession();
		OrderDTO orderDTO = orderService.getOrderById(id);
		if (orderDTO.isPaid())
			throw new ApiException("Order is paid");
		session.setAttribute("orderDTO", orderDTO);
		model.addAttribute("total", Double.valueOf(orderDTO.getTotal()));
		return "index";

	}

	@PostMapping("/pay")
	public String pay(HttpServletRequest request, @RequestParam("price") double price) {
		String cancelUrl = Utils.getBaseURL(request) + "/" + URL_PAYPAL_CANCEL;
		String successUrl = Utils.getBaseURL(request) + "/" + URL_PAYPAL_SUCCESS;
		// String successUrl = "http://localhost:3000";
		try {
			Payment payment = paymentService.createPayment(
					price,
					"USD",
					PaymentMethod.PAYPAL,
					PaypalPaymentIntent.SALE,
					"payment description",
					cancelUrl,
					successUrl);
			for (Links links : payment.getLinks()) {
				if (links.getRel().equals("approval_url")) {
					return "redirect:" + links.getHref();
				}
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
		return "redirect:/";
	}

	@GetMapping(URL_PAYPAL_CANCEL)
	public String cancelPay() {
		return "cancel";
	}

	@GetMapping(URL_PAYPAL_SUCCESS)
	public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
		try {
			Payment payment = paymentService.executePayment(paymentId, payerId);
			if (payment.getState().equals("approved")) {
				HttpSession session = request.getSession();
				OrderDTO orderDTO = (OrderDTO) session.getAttribute("orderDTO");
				orderService.payOrder(orderDTO.getId(), true);

				return "success";
			}
		} catch (PayPalRESTException e) {
			log.error(e.getMessage());
		}
		return "redirect:/";
	}
}
