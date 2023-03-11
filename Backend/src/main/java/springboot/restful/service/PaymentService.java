package springboot.restful.service;

import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import springboot.restful.model.payloads.PaymentMethod;
import springboot.restful.model.payloads.PaypalPaymentIntent;

public interface PaymentService {

	Payment createPayment(Double total,
	                             String currency,
	                             PaymentMethod method,
	                             PaypalPaymentIntent intent,
	                             String description,
	                             String cancelUrl,
	                             String successUrl) throws PayPalRESTException;

	Payment executePayment(String paymentId, String payerId) throws PayPalRESTException;
}
