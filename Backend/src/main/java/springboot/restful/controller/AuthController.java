package springboot.restful.controller;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ErrorDetails;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.LoginRequest;
import springboot.restful.model.payloads.ResetPassword;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.EmailSenderService;
import springboot.restful.service.UserService;

import javax.mail.MessagingException;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

	private static final long VERIFICATION_CODE_VALIDITY = 5 * 60; // 10 minutes
	@Autowired
	private JwtTokenHelper jwtTokenHelper;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private UserService userService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private HttpServletRequest request;
	@Autowired
	private HttpServletResponse response;
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private ModelMapper modelMapper;
	// @GetMapping("/logout")
	// public void logout() throws IOException {
	// Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	// Map<String, String> res = new HashMap<>();
	// if (auth != null) {
	// SecurityContextHolder.getContext().setAuthentication(null);
	// new SecurityContextLogoutHandler().logout(request, response, auth);
	// res.put("message", "Logout successfully");
	// } else res.put("message", "Already logout");
	//
	//
	// response.setContentType(APPLICATION_JSON_VALUE);
	// new ObjectMapper().writeValue(response.getOutputStream(), res);
	// }
	@Value("${jwt.expired}")
	private long JWT_TOKEN_VALIDITY;
	@Value("${jwt.secret_key}")
	private String secret;

	private void authenticate(String username, String password) throws Exception {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username,
				password);
		try {
			this.authenticationManager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			throw new ApiException("Invalid username or password");
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> createToken(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
		this.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

		UserDetails userDetails = this.userDetailsService.loadUserByUsername(loginRequest.getUsername());

		String token = jwtTokenHelper.generateToken(userDetails);

		Map res = new HashMap<>();
		res.put("timestamp", new Date().toLocaleString());
		res.put("message", "Login successfully");
		res.put("token", token);
		res.put("expired", jwtTokenHelper.getExpirationDateFromToken(token));
		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	@PostMapping("/register")
	// @EventListener(ApplicationReadyEvent.class)
	public ResponseEntity<?> createUser(@Valid @RequestBody UserDTO userDTO)
			throws MessagingException, ServletException, IOException {
		// if (checkPhone(userDTO.getPhoneNumber()))
		// return new ResponseEntity<UserDTO>(userService.createUser(userDTO),
		// HttpStatus.CREATED);
		// else
		// return new ResponseEntity<ErrorDetails>(new ErrorDetails(new
		// Date().toLocaleString(),
		// HttpStatus.BAD_REQUEST.toString(), "Phone number is not suitable",
		// request.getRequestURI(),
		// request.getMethod()),
		// HttpStatus.BAD_REQUEST);

		if (checkPhone(userDTO.getPhoneNumber()) && !userRepository.existsByEmail(userDTO.getEmail())
				&& !userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())) {

			String verificationCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
			emailSenderService.sendEmail(userDTO.getEmail(), "Email verification code".toUpperCase(),
					emailSenderService.htmlEmailVerificationCodeRegister(verificationCode,
							userDTO.getFirstName() + " " + userDTO.getLastName()));

			// HttpSession session = request.getSession(false);
			// if (session == null || !request.isRequestedSessionIdValid()) {
			// session = request.getSession();
			// session.setAttribute("verificationCode", verificationCode);
			// session.setAttribute("userDTO", userDTO);
			// session.setAttribute("expired", new Date(System.currentTimeMillis() +
			// VERIFICATION_CODE_VALIDITY * 1000));
			// } else {
			// session.invalidate();
			// HttpSession newSession = request.getSession();
			// newSession.setAttribute("verificationCode", verificationCode);
			// newSession.setAttribute("userDTO", userDTO);
			// newSession.setAttribute("expired", new Date(System.currentTimeMillis() +
			// VERIFICATION_CODE_VALIDITY * 1000));
			// }
			userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
			HttpSession session = request.getSession(true);
			session.setAttribute("verificationCode", verificationCode);
			session.setAttribute("userDTO", userDTO);

			Map res = new HashMap<>();
			res.put("password", userDTO.getPassword());
			res.put("expired", new Date(System.currentTimeMillis() + VERIFICATION_CODE_VALIDITY * 1000));
			res.put("message", "Please go to your email and get verification code to finish sign up a new account");
			res.put("user", userDTO);
			res.put("verificationCode", verificationCode);
			Cookie cookie = new Cookie("verificationCode", verificationCode);
			response.addCookie(cookie);

			// return new ResponseEntity<UserDTO>(userService.createUser(userDTO),
			// HttpStatus.CREATED);
			return new ResponseEntity<>(res, HttpStatus.OK);
		} else if (userRepository.existsByEmail(userDTO.getEmail()))
			return new ResponseEntity<ErrorDetails>(
					new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
							"Duplicate entry '" + userDTO.getEmail()
									+ "' for field 'email'. Please enter another email!",
							request.getRequestURI(), request.getMethod()),
					HttpStatus.BAD_REQUEST);
		else if (userRepository.existsByPhoneNumber(userDTO.getPhoneNumber()))
			return new ResponseEntity<ErrorDetails>(
					new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
							"Duplicate entry '" + userDTO.getPhoneNumber()
									+ "' for field 'phoneNumber'. Please enter another phone number!",
							request.getRequestURI(), request.getMethod()),
					HttpStatus.BAD_REQUEST);
		else
			return new ResponseEntity<ErrorDetails>(
					new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
							"Phone number is not suitable", request.getRequestURI(), request.getMethod()),
					HttpStatus.BAD_REQUEST);

	}

	private boolean checkPhone(String phoneNumber) {
		String reg = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$";
		return phoneNumber.matches(reg);
	}

	// @PostMapping("/**/verify")
	// public ResponseEntity<?> emailVerificationRegister(@RequestBody
	// EmailVerification emailVerification)
	// throws IOException {

	// try {

	// HttpSession session = request.getSession(false);

	// UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");
	// String verificationCode =
	// session.getAttribute("verificationCode").toString();
	// Date expired = (Date) session.getAttribute("expired");

	// Date now = new Date(System.currentTimeMillis());

	// if (now.before(expired)) {
	// if (verificationCode.equals(emailVerification.getCode())) {
	// if (request.getRequestURI().contains("register")) {
	// // session.removeAttribute("userDTO");
	// // session.removeAttribute("verificationCode");
	// // session.removeAttribute("expired");
	// session.invalidate();
	// return new ResponseEntity<>(userService.createUser(userDTO),
	// HttpStatus.CREATED);
	// }

	// if (request.getRequestURI().contains("forgot")) {
	// session.removeAttribute("verificationCode");
	// session.removeAttribute("expired");

	// expired = new Date(System.currentTimeMillis() + 10 * 60 * 1000);
	// session.setAttribute("expired", expired);
	// boolean exist = userRepository.existsByEmail(userDTO.getEmail());
	// Map<String, String> res = new HashMap<>();
	// // reset
	// res.put("expired", expired.toString());
	// if (exist) {
	// res.put("message", "Reset your password!");
	// return new ResponseEntity<>(res, HttpStatus.OK);
	// } else
	// throw new ApiException("You cannot reset password");

	// } else
	// return null;

	// } else
	// throw new ApiException("Verification code is not match");
	// } else
	// throw new ApiException("Verification code has expired time!");

	// } catch (NullPointerException e) {
	// throw new ApiException("Session is null");
	// }
	// }

	@PostMapping("/register/verify")
	public ResponseEntity<?> createNewUser(@Valid @RequestBody UserDTO userDTO) {

		return ResponseEntity.ok().body(userService.createUser(userDTO));
	}

	@PostMapping("/forgot/{id}/verify")
	public ResponseEntity<?> resetPassword(@PathVariable int id) throws MessagingException {
		String strRandom = UUID.randomUUID().toString();
		String firstRandom = strRandom.substring(0, 8);
		String secondRandom = strRandom.substring(24, 36);
		String randomPassword = firstRandom + secondRandom;

		UserDTO userDTO = userService.getUserById(id);
		userDTO.setPassword(randomPassword);
		userDTO = userService.updateUser(id, userDTO);

		emailSenderService.sendEmail(userDTO.getEmail(), "RESET PASSWORD",
				emailSenderService.htmlEmailResetPassword(randomPassword));

		Map res = new HashMap();
		res.put("messgae", "Please check your email to get new password!");
		res.put("timestamp", new Date().toLocaleString());
		return ResponseEntity.ok().body(res);
	}

	// @PostMapping("/forgot/verify")
	// public ResponseEntity<?>

	@PostMapping("/forgot")
	public ResponseEntity<?> forgotPassword(@RequestBody UserDTO DTO) throws MessagingException {

		User user = userRepository.findByEmail(DTO.getEmail())
				.orElseThrow(() -> new ApiException("User not found with email: " + DTO.getEmail()));

		UserDTO userDTO = modelMapper.map(user, UserDTO.class);

		String verificationCode = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
		emailSenderService.sendEmail(userDTO.getEmail(), "Email verification code".toUpperCase(),
				emailSenderService.htmlEmailVerificationCodeForgotPassword(verificationCode, userDTO.getFirstName())
						+ " " + userDTO.getLastName());

		// HttpSession session = request.getSession(true);
		// session.setAttribute("verificationCode", verificationCode);
		// session.setAttribute("userDTO", userDTO);
		// session.setAttribute("expired", new Date(System.currentTimeMillis() +
		// VERIFICATION_CODE_VALIDITY * 1000));

		// HttpSession session = request.getSession(false);
		// if (session == null || !request.isRequestedSessionIdValid()) {
		// session = request.getSession();
		// session.setAttribute("verificationCode", verificationCode);
		// session.setAttribute("userDTO", userDTO);
		// session.setAttribute("expired", new Date(System.currentTimeMillis() +
		// VERIFICATION_CODE_VALIDITY * 1000));
		// } else {
		// session.invalidate();
		// HttpSession newSession = request.getSession();
		// newSession.setAttribute("verificationCode", verificationCode);
		// newSession.setAttribute("userDTO", userDTO);
		// newSession.setAttribute("expired", new Date(System.currentTimeMillis() +
		// VERIFICATION_CODE_VALIDITY * 1000));
		// }

		Map res = new HashMap<>();

		res.put("expired", new Date(System.currentTimeMillis() + VERIFICATION_CODE_VALIDITY * 1000));
		res.put("message", "Please go to your email and get verification code to reset your password");
		res.put("user", userDTO.getId());
		res.put("verificationCode", verificationCode);

		return new ResponseEntity<>(res, HttpStatus.OK);
	}

	// @PostMapping("/reset")
	// public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPassword req)
	// {

	// try {
	// HttpSession session = request.getSession(false);
	// UserDTO userDTO = (UserDTO) session.getAttribute("userDTO");
	// Date expired = (Date) session.getAttribute("expired");

	// Date now = new Date(System.currentTimeMillis());

	// if (now.before(expired)) {
	// UserDTO newUserDTO = userService.resetPassword(userDTO.getId(),
	// req.getNewPassword(),
	// req.getConfirmPassword());
	// session.invalidate();
	// return new ResponseEntity<>(newUserDTO, HttpStatus.OK);
	// } else
	// throw new ApiException("Time out to reset password!");

	// } catch (NullPointerException e) {
	// throw new ApiException("Session is null");
	// }
	// }

	@PostMapping("/reset/{idUser}")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody ResetPassword req, @PathVariable int idUser) {
		UserDTO newUserDTO = userService.resetPassword(idUser, req.getNewPassword(), req.getConfirmPassword());
		return ResponseEntity.ok().body(newUserDTO);
	}

	@PostMapping("/logout")
	public ResponseEntity<?> logout(@RequestBody String token) {

		// Cookie[] cookie = request.getCookies();
		// Arrays.stream(cookie).forEach(ck -> System.out.println(ck.getValue()));
		//
		// ResponseCookie cleanCookie = ResponseCookie.from("cinemacookie",
		// null).path("/api").build();
		//
		// return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE,
		// cleanCookie.toString()).body("You've been logged out!");

		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		claims.setExpiration(claims.getIssuedAt());

		return ResponseEntity.ok(claims);
	}
}
