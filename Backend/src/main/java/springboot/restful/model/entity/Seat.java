package springboot.restful.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Seat {

	@Id
	private int id;
	private String name; // A1, A2, B1, B2, ...

	@OneToMany(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	@Fetch(value = FetchMode.SELECT)
	private List<Ticket> tickets = new ArrayList<>();

//	@OneToOne(mappedBy = "seat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	private Ticket ticket;

}
