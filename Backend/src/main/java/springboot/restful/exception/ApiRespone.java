package springboot.restful.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiRespone {

	private String timestamp;
	private String message;
	private boolean success;

}
