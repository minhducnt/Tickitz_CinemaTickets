package springboot.restful.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.payloads.SeatDTO;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.service.TicketService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

	@Autowired
	private TicketService ticketService;

	@PostMapping("/showtimes/{idShowTime}/seats/{idSeat}")
	public ResponseEntity<TicketDTO> createTicket(@PathVariable(value = "idShowTime") int idShowTime,
	                                              @PathVariable(value = "idSeat") int idSeat) {
		TicketDTO ticket = ticketService.createTicket(idShowTime, idSeat);
		return new ResponseEntity<TicketDTO>(ticket,
				HttpStatus.CREATED);
	}

	@PostMapping("/showtimes/{idShowTime}")
	public ResponseEntity<?> createManyTicket(@PathVariable int idShowTime, @RequestBody List<SeatDTO> seats) {
		return ResponseEntity.ok(ticketService.createManyTicket(idShowTime, seats));
	}

	@GetMapping("")
	public ResponseEntity<?> getAllTickets() {
		return new ResponseEntity<List<TicketDTO>>(ticketService.getAllTickets(), HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTicket(@PathVariable int id) {
		ticketService.deleteTicket(id);
		return new ResponseEntity<ApiRespone>(new ApiRespone(new Date().toLocaleString(), "Ticket was deleted with id: " + id, true), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getTicketById(@PathVariable int id) {
		return new ResponseEntity<TicketDTO>(ticketService.getTicketById(id), HttpStatus.OK);
	}

	@GetMapping("/showtimes/{idShowTime}")
	public ResponseEntity<?> getAllTicketsByShowTimes(@PathVariable int idShowTime) {
		return new ResponseEntity<List<TicketDTO>>(ticketService.getAllTicketsByShowTime(idShowTime), HttpStatus.OK);
	}
}
