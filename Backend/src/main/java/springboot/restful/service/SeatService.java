package springboot.restful.service;

import springboot.restful.model.payloads.SeatDTO;

import java.util.List;

public interface SeatService {

	// create
//	SeatDTO createSeat(SeatDTO seatDTO);

	// get
	SeatDTO getSeatById(int id);

	List<SeatDTO> getAllSeats();

	List<SeatDTO> getAllSeatsAvailableByShowTime(int idShowTime);

	List<SeatDTO> getAllSeatsOrderedByShowTime(int idShowTime);
}
