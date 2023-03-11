package springboot.restful.service;

import springboot.restful.model.payloads.ShowTimeDTO;

import java.util.Date;
import java.util.List;

public interface ShowTimeService {

    // create
    ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater);

    // get
    ShowTimeDTO getShowTimeById(int id);

    List<ShowTimeDTO> getAllShowTime();

    List<ShowTimeDTO> getAllShowTimeByTheater(int idTheater);

    List<ShowTimeDTO> getAllShowTimeByShowDate(Date showDate);

    List<ShowTimeDTO> getAllShowTimeByShowDateAndTheater(Date showDate, int idTheater);

    List<ShowTimeDTO> getAllShowTimeByShowDateAndMovie(Date showDate, int idMovie);

    // update
    ShowTimeDTO updateShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater, int idShowTime);

    // delete
    void deleteShowTime(int id);

    void deleteShowTimeForce(int id);

}
