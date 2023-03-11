package springboot.restful.controller;

import java.util.List;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.extern.slf4j.Slf4j;
import springboot.restful.model.payloads.GenreDTO;
import springboot.restful.service.GenreService;

@RestController
@RequestMapping("/api/genres")
@Slf4j
@CrossOrigin(origins = "*")

public class GenreController {
    @Autowired
    private GenreService genreService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createGenre(@Valid @RequestBody GenreDTO genreDTO) {
        // return new ResponseEntity<GenreDTO>(genreService.createGenre(genreDTO), ttpStatus.CREATED);
        log.error(genreDTO.getName());
        return new ResponseEntity<>(genreService.createGenre(genreDTO), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllGenres() {
        List<GenreDTO> genreDTOs = genreService.getAllGenres();
        return new ResponseEntity<List<GenreDTO>>(genreDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGenreById(@PathVariable int id) {
        GenreDTO genreDTO = genreService.getGenreById(id);
        log.error(genreDTO.toString());
        return new ResponseEntity<GenreDTO>(genreDTO, HttpStatus.OK);
    }
}
