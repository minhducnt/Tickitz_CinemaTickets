package springboot.restful.service;

import springboot.restful.model.payloads.TheaterDTO;

import java.util.List;

public interface TheaterService {

    // create
    TheaterDTO createTheater(TheaterDTO theaterDTO);

    // get
    TheaterDTO geTheaterById(int id);

    List<TheaterDTO> getAllTheaters();

    //update
    TheaterDTO updateTheater(int id, TheaterDTO theaterDTO);

}
