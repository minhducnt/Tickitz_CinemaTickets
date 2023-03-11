package springboot.restful.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {
	private String timestamp;
	private String error;
	private String message;
	private String path;
	private String method;
}
