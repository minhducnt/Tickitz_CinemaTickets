package springboot.restful.util;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class InitBean {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
