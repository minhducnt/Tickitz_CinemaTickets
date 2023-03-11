package springboot.restful.service.implement;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Theater;
import springboot.restful.model.payloads.TheaterDTO;
import springboot.restful.repository.TheaterRepository;
import springboot.restful.service.TheaterService;
import springboot.restful.util.ModelMapping;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TheaterServiceImp implements TheaterService, ModelMapping<Theater, TheaterDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TheaterRepository theaterRepository;

    @Override
    public Theater dtoToEntity(TheaterDTO dto) {
        return this.modelMapper.map(dto, Theater.class);
    }

    @Override
    public TheaterDTO entityToDTO(Theater entity) {
        return this.modelMapper.map(entity, TheaterDTO.class);
    }

    @Override
    public TheaterDTO createTheater(TheaterDTO theaterDTO) {
        Theater theater = dtoToEntity(theaterDTO);
        return entityToDTO(theaterRepository.save(theater));
    }

    @Override
    public TheaterDTO geTheaterById(int id) {
        Theater theater = theaterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Theater", "id", id));
        return entityToDTO(theater);
    }

    @Override
    public List<TheaterDTO> getAllTheaters() {
        return theaterRepository.findAll().stream().map(this::entityToDTO).collect(Collectors.toList());
    }

    @Override
    public TheaterDTO updateTheater(int id, TheaterDTO theaterDTO) {
        Theater theater = theaterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Theater", "id", id));
        theater.setName(theaterDTO.getName());
        return entityToDTO(theaterRepository.save(theater));
    }

}
