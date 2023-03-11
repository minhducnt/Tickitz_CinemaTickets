package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springboot.restful.config.AppConstant;
import springboot.restful.exception.ApiRespone;
import springboot.restful.model.payloads.MovieDTO;
import springboot.restful.service.MovieService;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api/movies")
@Slf4j
@CrossOrigin(origins = "*")
public class MovieController {

	@Autowired
	private MovieService movieService;

	//create movie
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("")
	public ResponseEntity<?> createMovie(@Valid @RequestBody MovieDTO movieDTO) {

		return new ResponseEntity<MovieDTO>(movieService.createMovie(movieDTO), HttpStatus.CREATED);
	}


	//get all movies List<Movie>
	@GetMapping()
	public ResponseEntity<?> getAllMovies(
			@RequestParam(value = "pageNumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstant.PAGE_SIZE, required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstant.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = AppConstant.SORT_DIR, required = false) String sortDir
	) {
//		return new ResponseEntity<List<MovieDTO>>(movieService.getAllMovie(), HttpStatus.OK);
		return ResponseEntity.ok().body(movieService.getAllMovies(pageNumber, pageSize, sortBy, sortDir));
	}


	//get by id
	@GetMapping("/{id}")
	public ResponseEntity<?> getMovieById(@PathVariable int id) {
		return ResponseEntity.ok().body(movieService.getMovieById(id));
	}

	// update movie
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<?> updateMovie(@PathVariable int id, @Valid @RequestBody MovieDTO movieDTO) {
		return ResponseEntity.ok().body(movieService.updateMovie(id, movieDTO));
	}

	// delete movie
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMovie(@PathVariable int id) {
		movieService.deleteMovie(id);
		return new ResponseEntity<ApiRespone>(
				new ApiRespone(new Date().toLocaleString(), "Movie was deleted with id : " + id, true),
				HttpStatus.OK);
	}

	@GetMapping("/display={isDisplay}")
	public ResponseEntity<?> getAllMoviesByDisplay(@PathVariable boolean isDisplay) {
		System.out.println("display: " + isDisplay);
		return ResponseEntity.ok().body(movieService.getAllMovieByDisplay(isDisplay));
	}

	@GetMapping("/showing={isShowing}")
	public ResponseEntity<?> getAllMoviesByShowing(@PathVariable boolean isShowing) {
//		System.out.println("display: " + isDisplay);
		return ResponseEntity.ok().body(movieService.getAllMovieByShowing(isShowing));
	}

	@GetMapping("/coming={isComing}")
	public ResponseEntity<?> getAllMoviesByComing(@PathVariable boolean isComing) {
//		System.out.println("display: " + isDisplay);
		return ResponseEntity.ok().body(movieService.getAllMovieByComing(isComing));
	}

	@GetMapping("/search/{keyword}")
	public ResponseEntity<?> searchMoviesByName(@PathVariable String keyword) {
		log.error(keyword);
		return ResponseEntity.ok().body(movieService.searchMovieByName(keyword));
	}
}
