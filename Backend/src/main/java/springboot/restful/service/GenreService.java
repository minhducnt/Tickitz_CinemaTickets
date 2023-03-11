package springboot.restful.service;

import springboot.restful.model.payloads.GenreDTO;

import java.util.List;

public interface GenreService {
    // create
    GenreDTO createGenre(GenreDTO genreDTO);

    // get
    GenreDTO getGenreById(int id);

    List<GenreDTO> getAllGenres();
}
