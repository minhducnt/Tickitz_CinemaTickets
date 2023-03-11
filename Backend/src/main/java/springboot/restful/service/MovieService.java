package springboot.restful.service;

import springboot.restful.model.payloads.MovieDTO;
import springboot.restful.model.payloads.MovieRespone;

import java.util.List;

public interface MovieService {

	// create
	MovieDTO createMovie(MovieDTO movieDTO);

	// get
	MovieDTO getMovieById(Integer id);

	//
	List<MovieDTO> getAllMovies();

	List<MovieDTO> getAllMovieByDisplay(boolean isDisplay);

	List<MovieDTO> getAllMovieByShowing(boolean isShowing);

	List<MovieDTO> getAllMovieByComing(boolean isComing);

	MovieRespone getAllMovies(int pageNumber, int pageSize, String sortBy, String sortDir);

	// update
	MovieDTO updateMovie(Integer id, MovieDTO movieDTO);

	// delete
	void deleteMovie(Integer id);

	//search
	List<MovieDTO> searchMovieByName(String keyword);

}
