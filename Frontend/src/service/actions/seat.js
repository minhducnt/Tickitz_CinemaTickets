import axiosClient from '../../shared/apis/axiosClient';

export const selectSeat = (seat) => ({
	type: 'SELECT_SEAT',
	payload: seat,
});

export const resetSelectingSeat = () => ({
	type: 'RESET_SELECT_SEAT',
});

export const getAllSeatsAvailableByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(
				`seats/available/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'GET_ALL_SEAT_AVAILABLE_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SEAT_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllSeatsOrderedByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(
				`seats/ordered/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'GET_ALL_SEAT_ORDERED_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SEAT_MESSAGE',
				payload: message,
			});
		}
	};
};
