package springboot.restful.service.implement;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import springboot.restful.exception.ApiException;
import springboot.restful.exception.ResourceNotFoundException;
import springboot.restful.model.entity.Movie;
import springboot.restful.model.entity.ShowTime;
import springboot.restful.model.entity.Theater;
import springboot.restful.model.entity.Ticket;
import springboot.restful.model.payloads.ShowTimeDTO;
import springboot.restful.model.payloads.TicketDTO;
import springboot.restful.repository.ShowTimeRepository;
import springboot.restful.repository.TicketRepository;
import springboot.restful.service.MovieService;
import springboot.restful.service.ShowTimeService;
import springboot.restful.service.TheaterService;
import springboot.restful.util.ModelMapping;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ShowTimeServiceImp implements ShowTimeService, ModelMapping<ShowTime, ShowTimeDTO> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private ShowTimeRepository showTimeRepository;

	@Autowired
	private MovieService movieService;

	@Autowired
	private TheaterService theaterService;

	@Autowired
	private TicketRepository ticketRepository;

	@Override
	public ShowTimeDTO getShowTimeById(int id) {

		ShowTime showTime = showTimeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", id));

		ShowTimeDTO showTimeDTO = entityToDTO(showTime);
		Date date = showTimeDTO.getShowDate();
		Date newDate = new Date();
		newDate.setDate(date.getDate());
		newDate.setMonth(date.getMonth());
		newDate.setYear(date.getYear());
		showTimeDTO.setShowDate(newDate);
		return showTimeDTO;
	}

	@Override
	public ShowTime dtoToEntity(ShowTimeDTO dto) {
		return this.modelMapper.map(dto, ShowTime.class);
	}

	@Override
	public ShowTimeDTO entityToDTO(ShowTime entity) {
		return this.modelMapper.map(entity, ShowTimeDTO.class);
	}

	@Override
	public ShowTimeDTO createShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater) {

		Movie movie = modelMapper.map(movieService.getMovieById(idMovie), Movie.class);
		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);
		ShowTime showTime = dtoToEntity(showTimeDTO);

		if (!movie.isDisplay())
			throw new ApiException("The movie is not display! Please update the movie!");

		if (!isShowTimeAvailable(getAllShowTimeByShowDateAndTheater(showTimeDTO.getShowDate(), idTheater),
				showTimeDTO.getTimeStart(), movie))
			throw new ApiException("Can not create new show time");

		showTime.setPrice(getPrice(showTimeDTO.getShowDate(), showTimeDTO.getTimeStart()));
		showTime.setTimeEnd(getTimeEnd(showTimeDTO.getTimeStart(), movie.getDuration()));
		showTime.setTheater(theater);
		showTime.setMovie(movie);

		return entityToDTO(showTimeRepository.save(showTime));
	}

	@Override
	public List<ShowTimeDTO> getAllShowTime() {
		List<ShowTimeDTO> showTimeDTOs = showTimeRepository.findAll().stream().map(this::entityToDTO)
				.collect(Collectors.toList());
		showTimeDTOs.stream().forEach(s -> {
			Date date = s.getShowDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			s.setShowDate(newDate);
		});

		return showTimeDTOs;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByShowDate(Date showDate) {

		List<ShowTime> showTimes = showTimeRepository.findByShowDate(showDate);
		return showTimes.stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByShowDateAndTheater(Date showDate, int idTheater) {

		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);
		List<ShowTime> showTimes = showTimeRepository.findByShowDateAndTheaterOrderByTimeStartAsc(showDate, theater);
		return showTimes.stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByShowDateAndMovie(Date showDate, int idMovie) {
		Movie movie = modelMapper.map(movieService.getMovieById(idMovie), Movie.class);
		List<ShowTime> showTimes = showTimeRepository.findByShowDateAndMovieOrderByTimeStartAsc(showDate, movie);
		List<ShowTimeDTO> showTimeDTOS = showTimes.stream().filter(st -> st.getMovie().isDisplay())
				.map(this::entityToDTO).collect(Collectors.toList());
		showTimeDTOS.forEach(st -> {
			Date date = st.getShowDate();
			Date newDate = new Date();
			newDate.setDate(date.getDate());
			newDate.setMonth(date.getMonth());
			newDate.setYear(date.getYear());
			st.setShowDate(newDate);
		});
		return showTimeDTOS;
	}

	@Override
	public List<ShowTimeDTO> getAllShowTimeByTheater(int idTheater) {
		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);
		List<ShowTime> showTimes = showTimeRepository.findByTheater(theater);
		return showTimes.stream().map(this::entityToDTO).collect(Collectors.toList());
	}

	private int getPrice(Date showDate, String timeStart) {

		String EEE = showDate.toString().substring(0, 3);
		String start = "";
		String stop = "";

		if (EEE.contains("Fri") || EEE.contains("Sat") || EEE.contains("Sun")) {

			// from 8AM -> 17PM => 20
			start = "08:00";
			stop = "17:00";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 20;
			// from 17PM -> 22PM => 25

			start = "17:00";
			stop = "22:00";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 25;

			// after 22PM => 15
			start = "22:00";
			stop = "23:59";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 15;

		} else if (EEE.contains("Tue")) {

			// 10 for all day
			return 10;

		} else {

			// from 8AM -> 17PM => 15

			start = "08:00";
			stop = "17:00";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 15;

			// from 17PM -> 22PM => 20

			start = "17:00";
			stop = "22:00";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 20;

			// after 22PM => 10
			start = "22:00";
			stop = "23:59";
			if (isBeetwenTwosTime(start, stop, timeStart))
				return 10;

		}

		return 0;
	}

	private boolean isBeetwenTwosTime(String start, String stop, String timeStart) {

		LocalTime startLC = LocalTime.parse(start);
		LocalTime stopLC = LocalTime.parse(stop);
		LocalTime timeStartLC = LocalTime.parse(timeStart);

		return (timeStartLC.getHour() >= startLC.getHour() && timeStartLC.getHour() < stopLC.getHour());
	}

	private String getTimeEnd(String timeStart, int duration) {

		int newDuration = duration + 30;

		LocalTime lc = LocalTime.parse(timeStart);

		int hour = lc.getHour() + (newDuration / 60);
		int minute = lc.getMinute() + (newDuration % 60);

		if (minute >= 60) {
			minute = minute % 60;
			hour += 1;
		}

		if (hour >= 24)
			hour = hour % 24;

		String strTimeEndHour = String.valueOf(hour);
		String strTimeEndMinute = String.valueOf(minute);

		if (strTimeEndMinute.length() == 1) {
			strTimeEndMinute = "0" + strTimeEndMinute;
		}
		if (strTimeEndHour.length() == 1) {
			strTimeEndHour = "0" + strTimeEndHour;

		}

		String timeEnd = "";
		timeEnd += strTimeEndHour + ":" + strTimeEndMinute;

		return timeEnd;

	}

	private boolean isShowTimeAvailable(List<ShowTimeDTO> showTimeDTOs, String timeStart, Movie movie) {
		LocalTime lcNewTimeStart = LocalTime.parse(timeStart);
		LocalTime lcNewTimeEnd = LocalTime.parse(getTimeEnd(timeStart, movie.getDuration()));

		String timeEnd = getTimeEnd(timeStart, movie.getDuration());

		int hourNewTimeStart = Integer.parseInt(timeStart.substring(0, 2));
		int minuteNewTimeStart = Integer.parseInt(timeStart.substring(3));

		int hourNewTimeEnd = Integer.parseInt(timeEnd.substring(0, 2));
		int minuteNewTimeEnd = Integer.parseInt(timeEnd.substring(3));

		if (hourNewTimeEnd < 8)
			hourNewTimeEnd += 24;

		// String newTimeEnd = String.valueOf(hourNewTimeEnd)+":"+timeEnd.substring(3);

		if (showTimeDTOs.isEmpty() || showTimeDTOs.size() == 0 || showTimeDTOs == null) {
			return true;
		}

		if (showTimeDTOs.size() == 1) {

			// for show time
			LocalTime lcShowTimeStart = LocalTime.parse(showTimeDTOs.get(0).getTimeStart());
			LocalTime lcShowTimeEnd = LocalTime.parse(showTimeDTOs.get(0).getTimeEnd());

			int hourShowTimeStart = Integer.parseInt(showTimeDTOs.get(0).getTimeStart().substring(0, 2));
			int minuteShowTimeStart = Integer.parseInt(showTimeDTOs.get(0).getTimeStart().substring(3));

			int hourShowTimeEnd = Integer.parseInt(showTimeDTOs.get(0).getTimeEnd().substring(0, 2));
			int minuteShowTimeEnd = Integer.parseInt(showTimeDTOs.get(0).getTimeEnd().substring(3));

			// if (lcNewTimeEnd.isBefore(lcShowTimeStart) ||
			// lcNewTimeStart.isAfter(lcShowTimeEnd) || lcNewTimeEnd.equals(lcShowTimeStart)
			// || lcNewTimeStart.equals(lcShowTimeEnd))
			// return true;

			if (hourNewTimeEnd < hourShowTimeStart)
				return true;

			if (hourNewTimeEnd == hourShowTimeStart && minuteNewTimeEnd <= minuteShowTimeStart)
				return true;

			if (hourNewTimeStart > hourShowTimeEnd)
				return true;

			if (hourNewTimeStart == hourShowTimeEnd && minuteNewTimeStart >= minuteShowTimeEnd)
				return true;
		}

		int check = 1;

		for (ShowTimeDTO st : showTimeDTOs) {
			int hourShowTimeStart = Integer.parseInt(st.getTimeStart().substring(0, 2));
			int minuteShowTimeStart = Integer.parseInt(st.getTimeStart().substring(3));

			if (hourNewTimeEnd > hourShowTimeStart) {
				check = -1;
				break;
			}
			if (hourNewTimeEnd == hourShowTimeStart) {
				if (minuteNewTimeEnd > minuteShowTimeStart) {
					check = -1;
					break;
				}
			}
		}

		if (check == 1)
			return true;

		int i = 0;
		int j = 1;
		while (i < showTimeDTOs.size() - 1 && j < showTimeDTOs.size()) {

			// LocalTime lcShowTimeStartBefore =
			// LocalTime.parse(showTimeDTOs.get(i).getTimeStart());
			LocalTime lcShowTimeEndBefore = LocalTime.parse(showTimeDTOs.get(i).getTimeEnd());

			LocalTime lcShowTimeStartAfter = LocalTime.parse(showTimeDTOs.get(j).getTimeStart());
			// LocalTime lcShowTimeEndAfter =
			// LocalTime.parse(showTimeDTOs.get(j).getTimeEnd());

			int hourShowTimeStartAfter = Integer.parseInt(showTimeDTOs.get(j).getTimeStart().substring(0, 2));
			int minuteShowTimeStartAfter = Integer.parseInt(showTimeDTOs.get(j).getTimeStart().substring(3));

			int hourShowTimeEndBefore = Integer.parseInt(showTimeDTOs.get(i).getTimeEnd().substring(0, 2));
			int minuteShowTimeEndBefore = Integer.parseInt(showTimeDTOs.get(i).getTimeEnd().substring(3));

			//
			// if (lcNewTimeStart.isAfter(lcShowTimeEndBefore) ||
			// lcNewTimeStart.equals(lcShowTimeEndBefore))
			// if (lcNewTimeEnd.isBefore(lcShowTimeStartAfter) ||
			// lcNewTimeEnd.equals(lcShowTimeStartAfter))
			// return true;

			if (hourNewTimeStart > hourShowTimeEndBefore) {
				if (hourNewTimeEnd < hourShowTimeStartAfter)
					return true;
				if (hourNewTimeEnd == hourShowTimeStartAfter)
					if (minuteNewTimeEnd <= minuteShowTimeStartAfter)
						return true;
			}

			if (hourNewTimeStart == hourShowTimeEndBefore && minuteNewTimeStart >= minuteShowTimeEndBefore) {
				if (hourNewTimeEnd < hourShowTimeStartAfter)
					return true;

				if (hourNewTimeEnd == hourShowTimeStartAfter)
					if (minuteNewTimeEnd < minuteShowTimeStartAfter)
						return true;
			}

			i++;
			j++;
		}

		if (i == showTimeDTOs.size() - 1) {
			LocalTime lcShowTimeEndLast = LocalTime.parse(showTimeDTOs.get(i).getTimeEnd());

			int hourShowTimeEndLast = Integer.parseInt(showTimeDTOs.get(i).getTimeEnd().substring(0, 2));

			if (hourShowTimeEndLast < 8)
				hourShowTimeEndLast += 24;
			int minuteShowTimeEndLast = Integer.parseInt(showTimeDTOs.get(i).getTimeEnd().substring(3));

			// if (lcNewTimeStart.isAfter(lcShowTimeEndLast) ||
			// lcNewTimeStart.equals(lcShowTimeEndLast))
			// return true;

			if (hourNewTimeStart > hourShowTimeEndLast)
				return true;
			if (hourNewTimeStart == hourShowTimeEndLast)
				return minuteNewTimeStart >= minuteShowTimeEndLast;
		}

		return false;
	}

	@Override
	public ShowTimeDTO updateShowTime(ShowTimeDTO showTimeDTO, int idMovie, int idTheater, int idShowTime) {
		Movie movie = modelMapper.map(movieService.getMovieById(idMovie), Movie.class);
		Theater theater = modelMapper.map(theaterService.geTheaterById(idTheater), Theater.class);
		ShowTime showTime = showTimeRepository.findById(idShowTime)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", idShowTime));

		if (getAllTicketsByShowTime(idShowTime).isEmpty() || getAllTicketsByShowTime(idShowTime).size() == 0
				|| getAllTicketsByShowTime(idShowTime) == null) {

			if (getAllShowTimeByShowDateAndTheater(showTimeDTO.getShowDate(), idTheater).size() > 1) {
				if (!isShowTimeAvailableForUpdate(idShowTime,
						getAllShowTimeByShowDateAndTheater(showTimeDTO.getShowDate(), idTheater),
						showTimeDTO.getTimeStart(), movie)) {
					throw new ApiException("Can not update show time because time overlap");
				}
			}

			if (showTimeDTO.getPrice() == null) {
				showTime.setPrice(getPrice(showTimeDTO.getShowDate(), showTimeDTO.getTimeStart()));
			} else {
				showTime.setPrice(showTimeDTO.getPrice());
			}
			showTime.setShowDate(showTimeDTO.getShowDate());
			showTime.setTimeStart(showTimeDTO.getTimeStart());
			showTime.setTimeEnd(getTimeEnd(showTimeDTO.getTimeStart(), movie.getDuration()));
			showTime.setTheater(theater);
			showTime.setMovie(movie);
		} else {
			throw new ApiException("Can not update show time because clients had bought ticket");
		}

		return entityToDTO(showTimeRepository.save(showTime));
	}

	@Override
	public void deleteShowTime(int id) {

		ShowTime showTime = showTimeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", id));
		if (!getAllTicketsByShowTime(id).isEmpty())
			throw new ApiException("Can not delete this show time");
		showTimeRepository.delete(showTime);

	}

	@Override
	public void deleteShowTimeForce(int id) {
		ShowTime showTime = showTimeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", id));
		// List<Ticket> tickets =
		// getAllTicketsByShowTime(id).stream().map(t->modelMapper.map(t,Ticket.class)).collect(Collectors.toList());
		// if(!tickets.isEmpty()){
		// tickets.forEach(t->ticketRepository.delete(t));
		// }
		showTimeRepository.delete(showTime);
	}

	private List<TicketDTO> getAllTicketsByShowTime(int idShowTime) {

		ShowTime showTime = showTimeRepository.findById(idShowTime)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", idShowTime));

		List<Ticket> tickets = ticketRepository.findByShowTime(showTime);
		List<TicketDTO> ticketDTOs = tickets.stream().map(t -> modelMapper.map(t, TicketDTO.class))

				.collect(Collectors.toList());
		return ticketDTOs;
	}

	private boolean isShowTimeAvailableForUpdate(int idShowTime, List<ShowTimeDTO> showTimeDTOS, String timeStart,
			Movie movie) {

		ShowTime showTime = showTimeRepository.findById(idShowTime)
				.orElseThrow(() -> new ResourceNotFoundException("ShowTime", "id", idShowTime));

		ShowTimeDTO showTimeDTO = entityToDTO(showTime);

		for (int i = 0; i < showTimeDTOS.size(); i++) {
			if (showTimeDTO.equals(showTimeDTOS.get(i))) {
				showTimeDTOS.remove(i);
				break;
			}
		}
		return isShowTimeAvailable(showTimeDTOS, timeStart, movie);
	}
}
