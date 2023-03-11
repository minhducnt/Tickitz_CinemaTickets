package springboot.restful.model.payloads;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDTO {

    private int id;

    @NotBlank
    private String name;

    @NotNull
    private Integer duration;

    private String description;
    private String image;

    private String trailer;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date releases;

    private Set<GenreDTO> genres = new HashSet<>();
    private boolean isShowing;
    private boolean isComing;
    private boolean isDisplay;


}
