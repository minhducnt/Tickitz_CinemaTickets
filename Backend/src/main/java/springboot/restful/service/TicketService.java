package springboot.restful.service;

import springboot.restful.model.payloads.SeatDTO;
import springboot.restful.model.payloads.TicketDTO;

import java.util.List;

public interface TicketService {

	// create
	TicketDTO createTicket(int idShowTime, int idSeat);

	List<TicketDTO> createManyTicket(int idShowTime, List<SeatDTO> seatDTOS);

	// get
	List<TicketDTO> getAllTicketsByShowTime(int idShowTime);

	List<TicketDTO> getAllTickets();

	TicketDTO getTicketById(int id);

	//delete
	void deleteTicket(int id);

	void deleteAllTicketNotSold(int idShowTime, int idSeat);
}
