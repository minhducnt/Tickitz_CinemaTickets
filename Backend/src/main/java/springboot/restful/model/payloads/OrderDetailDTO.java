package springboot.restful.model.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
	private int id;
	private TicketDTO ticket;
	private OrderDTO order;
}
