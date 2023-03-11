package springboot.restful.model.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SeatDTO {
    private int id;
    private String name; // A1, A2, B1, B2, ...

    // private Collection<TicketDTO> tickets = new HashSet<>();
}
