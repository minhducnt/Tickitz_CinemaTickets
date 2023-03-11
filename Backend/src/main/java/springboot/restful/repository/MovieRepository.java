package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import springboot.restful.model.entity.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

	List<Movie> findByIsDisplay(boolean isDisplay);

	List<Movie> findByIsComing(boolean isComing);

	List<Movie> findByIsShowing(boolean isShowing);

	List<Movie> findByNameContaining(String keyword);

	@Query("select p from Movie p where p.name like :key")
	List<Movie> searchByName(@Param("key") String name);

	List<Movie> findByNameLike(String name);

}
