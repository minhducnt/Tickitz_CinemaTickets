package springboot.restful.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import springboot.restful.model.payloads.TheaterDTO;
import springboot.restful.service.TheaterService;
import java.util.List;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/theaters")
@Slf4j
@CrossOrigin(origins = "*")

public class TheaterController {
    @Autowired
    private TheaterService theaterService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> createTheater(@Valid @RequestBody TheaterDTO theaterDTO) {

        return new ResponseEntity<TheaterDTO>(theaterService.createTheater(theaterDTO), HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllShowTimes() {
        List<TheaterDTO> theaterDTOs = theaterService.getAllTheaters();
        return new ResponseEntity<List<TheaterDTO>>(theaterDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getShowTimeById(@PathVariable int id) {
        TheaterDTO theaterDTO = theaterService.geTheaterById(id);
        log.error(theaterDTO.toString());
        return new ResponseEntity<TheaterDTO>(theaterDTO, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTheater(@PathVariable int id, @Valid @RequestBody TheaterDTO theaterDTO) {
        return ResponseEntity.ok().body(theaterService.updateTheater(id, theaterDTO));
    }

}
