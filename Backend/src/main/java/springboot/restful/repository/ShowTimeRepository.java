package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Movie;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Theater;

import java.util.Date;
import java.util.List;

@Repository
public interface ShowTimeRepository extends JpaRepository<ShowTime, Integer> {


	List<ShowTime> findByShowDate(Date showDate);

	List<ShowTime> findByTheater(Theater theater);

	List<ShowTime> findByShowDateAndTheaterOrderByTimeStartAsc(Date showDate, Theater theater);

	List<ShowTime> findByShowDateAndMovieOrderByTimeStartAsc(Date showDate, Movie movie);
}
