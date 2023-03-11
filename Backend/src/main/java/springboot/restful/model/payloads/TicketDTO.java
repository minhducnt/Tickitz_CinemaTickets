package springboot.restful.model.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketDTO {
    private int id;

    private SeatDTO seat;

    private ShowTimeDTO showTime;

    private int price;

    private boolean isSold;
}
