package springboot.restful.service.implement;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Genre;
import springboot.restful.model.payloads.GenreDTO;
import springboot.restful.repository.GenreRepository;
import springboot.restful.service.GenreService;
import springboot.restful.util.ModelMapping;

@Service
public class GenreServiceImp implements GenreService, ModelMapping<Genre, GenreDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private GenreRepository genreRepository;

    @Override
    public GenreDTO createGenre(GenreDTO genreDTO) {
        Genre genre = dtoToEntity(genreDTO); 
        return entityToDTO(genreRepository.save(genre));
    }

    @Override
    public GenreDTO getGenreById(int id) {
        Genre genre = genreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Genre", "id", id));
        return entityToDTO(genre);
    }

    @Override
    public List<GenreDTO> getAllGenres() {
        return genreRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public Genre dtoToEntity(GenreDTO genreDTO) {

        return modelMapper.map(genreDTO, Genre.class);
    }

    @Override
    public GenreDTO entityToDTO(Genre genre) {

        return modelMapper.map(genre, GenreDTO.class);
    }
}
