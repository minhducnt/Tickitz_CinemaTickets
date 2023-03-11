package springboot.restful.model.payloads;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import springboot.restful.model.enums.EGender;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

	private int id;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@NotBlank
	@Size(min = 10, message = "Phone number must be at least  10 characters!")
//	@Pattern(regexp = "(\\d-)?(\\d{4}-)?\\d{3}-\\d{3}")
//	@Pattern(regexp = "/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/")
//	@Pattern(regexp = "^(0|\\\\+84)(\\\\s|\\\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\\\d)(\\\\s|\\\\.)?(\\\\d{3})(\\\\s|\\\\.)?(\\\\d{3})$", message = "Phone number is not suitable")
	private String phoneNumber;

	@NotBlank
	@Email
	private String email;

	@NotBlank
//	@Size(min = 3)
	private String password;

	private EGender gender;

	private Set<RoleDTO> roles = new HashSet<>();
}
