package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.payloads.ShowTimeDTO;
import springboot.restful.service.ShowTimeService;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/showtimes")
@Slf4j
@CrossOrigin(origins = "*")
public class ShowTimeController {

	@Autowired
	private ShowTimeService showTimeService;

	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/movies/{idMovie}/theaters/{idTheater}")
	public ResponseEntity<?> createShowTime(@Valid @RequestBody ShowTimeDTO showTimeDTO,
			@PathVariable(value = "idMovie") int idMovie, @PathVariable(value = "idTheater") int idTheater) {
		// log.error(showTimeDTO.getTimeStart().toLocaleString());
		return new ResponseEntity<ShowTimeDTO>(showTimeService.createShowTime(showTimeDTO, idMovie, idTheater),
				HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{idShowTime}/movies/{idMovie}/theaters/{idTheater}")
	public ResponseEntity<?> updateShowTime(@Valid @RequestBody ShowTimeDTO showTimeDTO,
			@PathVariable(value = "idShowTime") int idShowTime,
			@PathVariable(value = "idMovie") int idMovie, @PathVariable(value = "idTheater") int idTheater) {
		// log.error(showTimeDTO.getTimeStart().toLocaleString());
		return new ResponseEntity<ShowTimeDTO>(
				showTimeService.updateShowTime(showTimeDTO, idMovie, idTheater, idShowTime),
				HttpStatus.OK);
	}

	@GetMapping("")
	public ResponseEntity<?> getAllShowTimes() {
		List<ShowTimeDTO> showTimeDTOs = showTimeService.getAllShowTime();
		return new ResponseEntity<List<ShowTimeDTO>>(showTimeDTOs, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getShowTimeById(@PathVariable int id) {
		ShowTimeDTO showTimeDTO = showTimeService.getShowTimeById(id);
		log.error(showTimeDTO.toString());
		return new ResponseEntity<ShowTimeDTO>(showTimeDTO, HttpStatus.OK);
	}

	// @GetMapping("/movies/{idMovie}")
	// public ResponseEntity<?> getAllShowTimeByShowDateAndMovie(@PathVariable int
	// idMovie,
	// @RequestBody ShowTimeDTO showTimeDTO) {
	// List<ShowTimeDTO> showTimeDTOs =
	// showTimeService.getAllShowTimeByShowDateAndMovie(showTimeDTO.getShowDate(),
	// idMovie);
	// return new ResponseEntity<List<ShowTimeDTO>>(showTimeDTOs, HttpStatus.OK);
	// }

	@GetMapping("theaters/{idTheater}")
	public ResponseEntity<?> getShowTimeByTheater(@PathVariable int idTheater) {
		List<ShowTimeDTO> showTimeDTO = showTimeService.getAllShowTimeByTheater(idTheater);
		log.error(showTimeDTO.toString());
		return new ResponseEntity<List<ShowTimeDTO>>(showTimeDTO, HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteShowTime(@PathVariable int id) {
		showTimeService.deleteShowTime(id);
		return new ResponseEntity<ApiRespone>(
				new ApiRespone(new Date().toLocaleString(), "Show time was deleted with id: " + id, true),
				HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/force/{id}")
	public ResponseEntity<?> deleteShowTimeForce(@PathVariable int id) {
		showTimeService.deleteShowTimeForce(id);
		return new ResponseEntity<ApiRespone>(
				new ApiRespone(new Date().toLocaleString(), "Show time was force-deleted with id: " + id, true),
				HttpStatus.OK);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{idShowTime}")
	public ResponseEntity<?> updateShowTimes(@Valid @RequestBody ShowTimeDTO showTimeDTO, @PathVariable int idShowTime,
			@RequestParam(value = "movies", required = true) Integer idMovie,
			@RequestParam(value = "theaters", required = true) Integer idTheater) {
		if (idMovie != null && idTheater != null)
			return new ResponseEntity<ShowTimeDTO>(
					showTimeService.updateShowTime(showTimeDTO, idMovie, idTheater, idShowTime), HttpStatus.OK);
		else
			return new ResponseEntity<ApiRespone>(
					new ApiRespone(new Date().toLocaleString(), "please enter movie and theater", false),
					HttpStatus.BAD_REQUEST);
	}

	@PostMapping("/movies/{idMovie}")
	public ResponseEntity<?> getAllShowTimeByShowDateAndMovie(@PathVariable int idMovie,
			@RequestBody ShowTimeDTO showTimeDTO) {
		return ResponseEntity.ok()
				.body(showTimeService.getAllShowTimeByShowDateAndMovie(showTimeDTO.getShowDate(),
						idMovie));
	}
}
