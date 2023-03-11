package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Genre;
import springboot.restful.model.entity.Movie;
import springboot.restful.model.payloads.MovieDTO;
import springboot.restful.model.payloads.MovieRespone;
import springboot.restful.repository.GenreRepository;
import springboot.restful.repository.MovieRepository;
import springboot.restful.service.MovieService;
import springboot.restful.util.ModelMapping;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieServiceImp implements MovieService, ModelMapping<Movie, MovieDTO> {

	@Autowired
	private MovieRepository movieRepository;

	@Autowired
	private GenreRepository genreRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public MovieDTO createMovie(MovieDTO movieDTO) {

		Movie movie = dtoToEntity(movieDTO);

		movie.setDisplay(true);

		Date now = new Date();
		if (now.before(movieDTO.getReleases())) {
			System.out.println("comming soon");
			movie.setComing(true);
			movie.setShowing(false);
		} else {
			System.out.println("now showing");
			movie.setShowing(true);
			movie.setComing(false);
		}

		movieDTO.getGenres().forEach(g -> {
			System.out.println("id = " + g.getId() + " ;name = " + g.getName());
			Genre genre = genreRepository.findById(g.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Genre", "id", g.getId()));
			System.out.println(genre);
			movie.getGenres().add(genre);
		});

		return entityToDTO(movieRepository.save(movie));
	}

	@Override
	public MovieDTO getMovieById(Integer id) {

		Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

		return entityToDTO(movie);
	}

	@Override
	public List<MovieDTO> getAllMovies() {
		return movieRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<MovieDTO> getAllMovieByDisplay(boolean isDisplay) {
		return movieRepository.findByIsDisplay(isDisplay).stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<MovieDTO> getAllMovieByShowing(boolean isShowing) {
		return movieRepository.findByIsShowing(isShowing).stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<MovieDTO> getAllMovieByComing(boolean isComing) {
		return movieRepository.findByIsComing(isComing).stream().map(this::entityToDTO).collect(Collectors.toList());

	}

	@Override
	public MovieRespone getAllMovies(int pageNumber, int pageSize, String sortBy, String sortDir) {

		Sort sort = (sortDir.equalsIgnoreCase("asc"))
				? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, sort);

		Page<Movie> pageMovies = movieRepository.findAll(pageable);

		List<Movie> allMovies = pageMovies.getContent();

		List<MovieDTO> allMoviesDTO = allMovies.stream().map(this::entityToDTO).collect(Collectors.toList());

		MovieRespone movieRespone = MovieRespone.builder()
				.content(allMoviesDTO)
				.pageNumber(pageMovies.getNumber())
				.lastPage(pageMovies.isLast())
				.pageSize(pageMovies.getSize())
				.totalPages(pageMovies.getTotalPages())
				.totalElements(pageMovies.getTotalElements())
				.build();

		// movieRespone.setContent(allMoviesDTO);
		// movieRespone.setPageNumber(pageMovies.getNumber());
		// movieRespone.setPageSize(pageMovies.getSize());
		// movieRespone.setTotalElements(pageMovies.getTotalElements());
		// movieRespone.setLastPage(pageMovies.isLast());

		return movieRespone;
	}

	@Override
	public MovieDTO updateMovie(Integer id, MovieDTO movieDTO) {

		Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));

		movie.setDescription(movieDTO.getDescription());
		movie.setName(movieDTO.getName());
		movie.setDuration(movieDTO.getDuration());
		movie.setImage(movieDTO.getImage());
		movie.setTrailer(movieDTO.getTrailer());
		movie.setReleases(movieDTO.getReleases());
		movie.setShowing(movieDTO.isShowing());
		movie.setComing(movieDTO.isComing());
		movie.setDisplay(movieDTO.isDisplay());

		movie.getGenres().clear();

		movieDTO.getGenres().stream().forEach(g -> {
			Genre genre = genreRepository.findById(g.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Genre", "id", g.getId()));
			movie.getGenres().add(genre);
		});

		if (!movieDTO.isDisplay()) {
			movie.setShowing(false);
			movie.setComing(false);
		} else {
			Date now = new Date();
			if (now.before(movieDTO.getReleases())) {
				System.out.println("comming soon");
				movie.setComing(true);
				movie.setShowing(false);
			} else {
				System.out.println("now showing");
				movie.setShowing(true);
				movie.setComing(false);
			}
		}

		return entityToDTO(movieRepository.save(movie));
	}

	@Override
	public void deleteMovie(Integer id) {
		// TODO Auto-generated method stub
		Movie movie = movieRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
		movieRepository.delete(movie);
	}

	@Override
	public List<MovieDTO> searchMovieByName(String name) {
		List<Movie> movies = movieRepository.searchByName("%" + name + "%");
		return movies.stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public Movie dtoToEntity(MovieDTO dto) {
		return this.modelMapper.map(dto, Movie.class);
	}

	@Override
	public MovieDTO entityToDTO(Movie entity) {
		return this.modelMapper.map(entity, MovieDTO.class);
	}

}
