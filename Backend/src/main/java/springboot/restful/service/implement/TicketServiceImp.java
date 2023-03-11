package springboot.restful.service.implement;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;
import springboot.restful.model.payloads.SeatDTO;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.SeatService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TicketService;
import springboot.restful.util.ModelMapping;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TicketServiceImp implements TicketService, ModelMapping<Ticket, TicketDTO> {

	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private SeatService seatService;

	@Autowired
	private ShowTimeService showTimeService;

	@Override
	public TicketDTO createTicket(int idShowTime, int idSeat) {

		ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);

		Seat seat = modelMapper.map(seatService.getSeatById(idSeat), Seat.class);

		Ticket ticket = new Ticket();

		if (isSeatAvailable(seatService.getAllSeatsOrderedByShowTime(idShowTime), seat))
			ticket.setSeat(seat);
		else
			throw new ApiException("The seat " + seat.getName() + " was ordered! Please try the other seat!");


		ticket.setShowTime(showTime);
		ticket.setPrice(showTime.getPrice());
		return entityToDTO(ticketRepository.save(ticket));
	}

	@Override
	public List<TicketDTO> createManyTicket(int idShowTime, List<SeatDTO> seatDTOS) {

		ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);
		List<TicketDTO> listTicketDTOS = new ArrayList<>();
		seatDTOS.forEach(s -> listTicketDTOS.add(createTicket(idShowTime, s.getId())));

		return listTicketDTOS;
	}


	@Override
	public Ticket dtoToEntity(TicketDTO dto) {
		return this.modelMapper.map(dto, Ticket.class);
	}

	@Override
	public TicketDTO entityToDTO(Ticket entity) {
		return this.modelMapper.map(entity, TicketDTO.class);
	}

	private boolean isSeatAvailable(List<SeatDTO> listSeatOrderedDTO, Seat seat) {
		List<Seat> listSeatOrdered = listSeatOrderedDTO.stream().map(s -> modelMapper.map(s, Seat.class)).filter(s -> s.equals(seat)).collect(Collectors.toList());
		return listSeatOrdered.isEmpty();
	}

	@Override
	public List<TicketDTO> getAllTicketsByShowTime(int idShowTime) {

		ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);

		List<Ticket> tickets = ticketRepository.findByShowTime(showTime);

		List<TicketDTO> ticketDTOS = tickets.stream().map(this::entityToDTO).collect(Collectors.toList());
		ticketDTOS.forEach(t -> {
			Date date = t.getShowTime().getShowDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			t.getShowTime().setShowDate(newDate);
		});
		return ticketDTOS;
	}

	@Override
	public List<TicketDTO> getAllTickets() {
		List<TicketDTO> ticketDTOS = ticketRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
		ticketDTOS.forEach(t -> {
			Date date = t.getShowTime().getShowDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			t.getShowTime().setShowDate(newDate);
		});
		return ticketDTOS;
	}

	@Override
	public TicketDTO getTicketById(int id) {
		Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
		return entityToDTO(ticket);
	}

	@Override
	public void deleteTicket(int id) {
		Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Ticket", "id", id));
		ticketRepository.delete(ticket);
	}

	@Override
	public void deleteAllTicketNotSold(int idShowTime, int idSeat) {
		ShowTime showTime = modelMapper.map(showTimeService.getShowTimeById(idShowTime), ShowTime.class);
		Seat seat = modelMapper.map(seatService.getSeatById(idSeat), Seat.class);
		ticketRepository.findByShowTimeAndSeat(showTime, seat).stream().filter(ticket -> !ticket.isSold()).forEach(ticket -> deleteTicket(ticket.getId()));
	}


}
