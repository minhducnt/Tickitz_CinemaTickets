package springboot.restful.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springboot.restful.service.SeatService;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin(origins = "*")
public class SeatController {

	@Autowired
	private SeatService seatService;

	@GetMapping("/available/showtimes/{idShowTime}")
	public ResponseEntity<?> getAllSeatsAvailableByShowTime(@PathVariable int idShowTime) {
		return ResponseEntity.ok().body(seatService.getAllSeatsAvailableByShowTime(idShowTime));
	}

	@GetMapping("/ordered/showtimes/{idShowTime}")
	public ResponseEntity<?> getAllSeatsOrderedByShowTime(@PathVariable int idShowTime) {
		return ResponseEntity.ok().body(seatService.getAllSeatsOrderedByShowTime(idShowTime));
	}
}
