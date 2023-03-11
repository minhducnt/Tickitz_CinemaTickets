package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {

}
