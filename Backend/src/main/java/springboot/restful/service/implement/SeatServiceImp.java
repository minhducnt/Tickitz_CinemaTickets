package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;
import springboot.restful.model.payloads.SeatDTO;
import springboot.restful.repository.SeatRepository;
import springboot.restful.repository.ShowTimeRepository;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.SeatService;
import springboot.restful.util.ModelMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatServiceImp implements SeatService, ModelMapping<Seat, SeatDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private TicketRepository ticketRepository;

	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Autowired
	private SeatRepository seatRepository;

	@Override
	public SeatDTO getSeatById(int id) {
		Seat seat = seatRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Seat", "id", id));
		return entityToDTO(seat);
	}

	@Override
	public List<SeatDTO> getAllSeats() {
		return seatRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<SeatDTO> getAllSeatsAvailableByShowTime(int idShowTime) {
		List<Seat> seats = seatRepository.findAll();
		List<SeatDTO> seatsAvailable = seats.stream().map(s -> modelMapper.map(s, SeatDTO.class)).collect(Collectors.toList());
		List<SeatDTO> seatsOrdered = getAllSeatsOrderedByShowTime(idShowTime);
		seatsOrdered.forEach(seatsAvailable::remove);
		return seatsAvailable;

	}

	@Override
	public List<SeatDTO> getAllSeatsOrderedByShowTime(int idShowTime) {

		ShowTime showTime = showTimeRepository.findById(idShowTime).orElseThrow(() -> new ResourceNotFoundException("Show time", "id", idShowTime));
		List<Ticket> tickets = ticketRepository.findByShowTime(showTime);
		List<Seat> seats = seatRepository.findAll();

		if (tickets.isEmpty()) return new ArrayList<>();

		List<Seat> seatsOrdered = new ArrayList<>();

//		tickets.forEach(t -> seatsOrdered.add(t.getSeat()));

		tickets.stream().filter(t -> t.isSold() == true).forEach(t -> seatsOrdered.add(t.getSeat()));

		return seatsOrdered.stream().map(this::entityToDTO).collect(Collectors.toList());

	}

	@Override
	public Seat dtoToEntity(SeatDTO dto) {
		return this.modelMapper.map(dto, Seat.class);
	}

	@Override
	public SeatDTO entityToDTO(Seat entity) {
		return this.modelMapper.map(entity, SeatDTO.class);
	}

}
