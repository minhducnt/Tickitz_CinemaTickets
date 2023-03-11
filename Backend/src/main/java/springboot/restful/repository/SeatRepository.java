package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

}
