package springboot.restful.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	private Seat seat;

	@ManyToOne
	private ShowTime showTime;

	private int price;

	private boolean isSold;


	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "ticket")
	private Set<OrderDetail> orderDetails = new HashSet<>();

}
