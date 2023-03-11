package springboot.restful.service.implement;

import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.model.payloads.PaymentMethod;
import springboot.restful.model.payloads.PaypalPaymentIntent;
import springboot.restful.service.PaymentService;

import java.util.ArrayList;
import java.util.List;

@Service
public class PaymentServiceImp implements PaymentService {

	@Autowired
	private APIContext apiContext;

	@Override
	public Payment createPayment(Double total, String currency, PaymentMethod method, PaypalPaymentIntent intent, String description, String cancelUrl, String successUrl) throws PayPalRESTException {
		Amount amount = new Amount();
		amount.setCurrency(currency);
		amount.setTotal(String.format("%.2f", total));
		Transaction transaction = new Transaction();
		transaction.setDescription(description);
		transaction.setAmount(amount);
		List transactions = new ArrayList();
		transactions.add(transaction);
		Payer payer = new Payer();
		payer.setPaymentMethod(method.toString());
		Payment payment = new Payment();
		payment.setIntent(intent.toString());
		payment.setPayer(payer);
		payment.setTransactions(transactions);
		RedirectUrls redirectUrls = new RedirectUrls();
		redirectUrls.setCancelUrl(cancelUrl);
		redirectUrls.setReturnUrl(successUrl);
		payment.setRedirectUrls(redirectUrls);
		apiContext.setMaskRequestId(true);
		return payment.create(apiContext);
	}

	@Override
	public Payment executePayment(String paymentId, String payerId) throws PayPalRESTException {
		Payment payment = new Payment();
		payment.setId(paymentId);
		PaymentExecution paymentExecute = new PaymentExecution();
		paymentExecute.setPayerId(payerId);
		return payment.execute(apiContext, paymentExecute);
	}
}
