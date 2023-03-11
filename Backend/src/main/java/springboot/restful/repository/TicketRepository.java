package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Ticket;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

	List<Ticket> findByShowTime(ShowTime showTime);

	List<Ticket> findByShowTimeAndSeat(ShowTime showTime, Seat seat);


}
