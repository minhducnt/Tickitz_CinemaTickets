package springboot.restful.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.mail.MailSendException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import javax.servlet.http.HttpServletRequest;
import java.nio.file.AccessDeniedException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@Autowired
	private HttpServletRequest request;

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
		String message = ex.getMessage();
		ErrorDetails errorDetails = new ErrorDetails(new Date().toLocaleString(), HttpStatus.NOT_FOUND.toString(),
				message, request.getRequestURI(), request.getMethod());
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgsNotValidException(MethodArgumentNotValidException ex) {
		Map<String, String> respone = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((erorr) -> {
			String fieldName = ((FieldError) erorr).getField();
			String message = erorr.getDefaultMessage();
			respone.put(fieldName, message);
		});
		return new ResponseEntity<Map<String, String>>(respone, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(SQLIntegrityConstraintViolationException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handleSQLIntegrityConstraintViolationException(
			SQLIntegrityConstraintViolationException ex) {

		String message = ex.getCause() == null ? ex.getMessage() : ex.getCause().getLocalizedMessage();
		String mess = message.substring(0, message.indexOf("user.UK_"));

		if (message.contains("@"))// email
			mess += "email'. Please enter another email";
		else // phone number
			mess += "phoneNumber'. Please enter another phone number";

		ErrorDetails errorDetails = new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
				mess, request.getRequestURI(), request.getMethod());
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
		ex.printStackTrace();
		String message = ex.getCause() == null ? ex.getMessage() : ex.getCause().getLocalizedMessage();

		ErrorDetails errorDetails = new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
				message, request.getRequestURI(), request.getMethod());
		return new ResponseEntity<ErrorDetails>(errorDetails, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
		return new ResponseEntity<ErrorDetails>(
				new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
						ex.getLocalizedMessage(), request.getRequestURI(), request.getMethod()),
				HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<?> handleApiException(ApiException ex) {
		return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), ex.getMessage(), false),
				HttpStatus.NOT_ACCEPTABLE);
	}

	@ExceptionHandler(MissingServletRequestParameterException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseEntity<ApiRespone> handleMissingServletRequestParameterException(MissingServletRequestParameterException ex) {
		String mess = ex.getMessage();
		return ResponseEntity.ok().body(new ApiRespone(new Date().toLocaleString(), mess, false));
	}

	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(value = HttpStatus.FORBIDDEN)
	public ResponseEntity<?> handlerAccessDeniedException(AccessDeniedException e) {
		String mess = e.getMessage();
		return ResponseEntity.status(403).body(new ApiRespone(new Date().toLocaleString(), mess, false));
	}


	@ExceptionHandler(MethodArgumentTypeMismatchException.class)
	@ResponseStatus(value = HttpStatus.BAD_REQUEST)
	public ResponseEntity<?> handlerMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
		String mess = e.getMessage();
		return ResponseEntity.badRequest().body(new ApiRespone(new Date().toLocaleString(), mess, false));
	}

	@ExceptionHandler(MailSendException.class)
	@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
	public ResponseEntity<?> handlerMailSendException(MailSendException e) {
		String mess = e.getMessage();
		return ResponseEntity.internalServerError().body(new ApiRespone(new Date().toLocaleString(), mess, false));
	}
}
