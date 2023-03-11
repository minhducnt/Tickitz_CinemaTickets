package springboot.restful.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import springboot.restful.config.AppConstant;
import springboot.restful.model.entity.Genre;
import springboot.restful.model.entity.Role;
import springboot.restful.model.entity.Seat;
import springboot.restful.model.entity.Theater;
import springboot.restful.model.enums.EGenre;
import springboot.restful.model.enums.ERole;
import springboot.restful.repository.GenreRepository;
import springboot.restful.repository.RoleRepository;
import springboot.restful.repository.SeatRepository;
import springboot.restful.repository.TheaterRepository;

import java.util.ArrayList;
import java.util.List;

//@Component
public class InitData implements CommandLineRunner {

	@Autowired
	private GenreRepository genreRepository;
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private SeatRepository seatRepository;

	@Autowired
	private TheaterRepository theaterRepository;

	public void initTheaterData() {
		Theater theater = new Theater();

		for (int i = 1; i <= 5; i++) {
			theater.setId(i);
			theater.setName("Screen " + i);
			theaterRepository.save(theater);
		}
	}

	public void initSeatData() {
		Seat seat = new Seat();
		int id = 1;
		for (char j = 'A'; j <= 'J'; j++) {
			for (int i = 0; i < 10; i++) {
				seat.setId(id);
				seat.setName(j + "-" + i);
				seatRepository.save(seat);
				id++;
			}
		}
	}

	public void initGenreData() {
		List<Genre> genres = new ArrayList<>();
		genres.add(new Genre(1, String.valueOf(EGenre.ACTION)));
		genres.add(new Genre(2, String.valueOf(EGenre.COMEDIES)));
		genres.add(new Genre(3, String.valueOf(EGenre.ANIMATION)));
		genres.add(new Genre(4, String.valueOf(EGenre.DOCUMENTARIES)));
		genres.add(new Genre(5, String.valueOf(EGenre.ROMANCE)));
		genres.add(new Genre(6, String.valueOf(EGenre.HOLLYWOOD)));
		genres.add(new Genre(7, String.valueOf(EGenre.CRIME)));
		genres.add(new Genre(8, String.valueOf(EGenre.THRILLER)));
		genres.add(new Genre(9, String.valueOf(EGenre.DRAMAS)));
		genres.add(new Genre(10, String.valueOf(EGenre.ANIME)));
		genreRepository.saveAll(genres);
	}

	public void initRoleData() {

		List<Role> roles = new ArrayList<>();
		roles.add(new Role(AppConstant.ROLE_ADMIN, ERole.ROLE_ADMIN));
		roles.add(new Role(AppConstant.ROLE_USER, ERole.ROLE_USER));
		roleRepository.saveAll(roles);
	}

	@Override
	public void run(String... args) throws Exception {
		initGenreData();
		initRoleData();
		initTheaterData();
		initSeatData();
	}
}
