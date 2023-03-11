package springboot.restful.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import springboot.restful.model.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
