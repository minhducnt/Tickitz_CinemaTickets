package springboot.restful.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Entity
@Data
public class ShowTime {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;


	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@JsonFormat(pattern = "dd-MM-yyyy")
	private Date showDate;


//	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@JsonFormat(pattern = "HH:mm")
	private String timeStart;


//	@Temporal(TemporalType.DATE)
	@Column(nullable = false)
	@JsonFormat(pattern = "HH:mm")
	private String timeEnd;

	@Column(nullable = false)
	private int price;

	@ManyToOne
	@JoinColumn(name = "movie_id")
	private Movie movie;

	@ManyToOne
	@JoinColumn(name = "theater_id")
	private Theater theater;

	@OneToMany(mappedBy = "showTime", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Ticket> tickets = new ArrayList<>();
}
