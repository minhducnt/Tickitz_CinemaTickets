package springboot.restful.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer duration;

    private String description;

    private String image;
    private String trailer;

    @Temporal(TemporalType.DATE)
    // @JsonFormat(pattern = "dd-MM-yyyy")
    private Date releases;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "movie_genre", joinColumns = @JoinColumn(name = "movie", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "genre", referencedColumnName = "id"))
    private Set<Genre> genres = new HashSet<>();

    private boolean isShowing;
    private boolean isComing;
    private boolean isDisplay;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "movie")
    private Set<ShowTime> showTimes = new HashSet<>();

}
