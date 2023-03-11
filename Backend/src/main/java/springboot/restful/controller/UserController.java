package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import springboot.restful.config.security.JwtTokenHelper;
import springboot.restful.exception.ErrorDetails;
import springboot.restful.model.entity.User;
import springboot.restful.model.payloads.ChangePassword;
import springboot.restful.model.payloads.TokenRequest;
import springboot.restful.model.payloads.UserDTO;
import springboot.restful.repository.UserRepository;
import springboot.restful.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private HttpServletRequest request;

	@Autowired
	private JwtTokenHelper jwtTokenHelper;

	@GetMapping("/")
	public ResponseEntity<List<UserDTO>> getAllUsers() {
		return new ResponseEntity<List<UserDTO>>(userService.getAllUsers(), HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Integer id) {
		return new ResponseEntity<UserDTO>(userService.getUserById(id), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('USER')")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateUser(@PathVariable Integer id, @Valid @RequestBody UserDTO userDTO) {
		if (checkPhone(userDTO.getPhoneNumber()))
			return new ResponseEntity<UserDTO>(userService.updateUser(id, userDTO), HttpStatus.OK);
		else
			return new ResponseEntity<ErrorDetails>(
					new ErrorDetails(new Date().toLocaleString(), HttpStatus.BAD_REQUEST.toString(),
							"Phone number is not suitable", request.getRequestURI(), request.getMethod()),
					HttpStatus.BAD_REQUEST);
	}

	@PreAuthorize("hasRole('USER')")
	@PutMapping("/changepassword/{id}")
	public ResponseEntity<?> changeUserPassword(@Valid @RequestBody ChangePassword changePassword,
			@PathVariable Integer id) {
		// User user = decodeJWTFromToken();
		return ResponseEntity.ok().body(userService.changePassword(id, changePassword.getOldPassword(),
				changePassword.getNewPassword(), changePassword.getConfirmPassword()));
	}

	@PostMapping("")
	public ResponseEntity<?> getUserFromToken(@RequestBody TokenRequest request) {
		String username = jwtTokenHelper.getUsernameFromToken(request.getToken());
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found"));
		UserDTO userDTO = UserDTO.builder().email(username).id(user.getId()).build();
		return ResponseEntity.ok(userDTO);
	}

	private boolean checkPhone(String phoneNumber) {
		String reg = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$";
		return phoneNumber.matches(reg);
	}

	private User decodeJWTFromToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();
		User user = userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Username not found with " + username));
		return user;
	}
}
