package springboot.restful.model.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
	private int id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date date;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
	private String time;

	private UserDTO user;
	private boolean isPaid;
	private int total;
}
