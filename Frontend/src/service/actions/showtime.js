import axiosClient from '../../shared/apis/axiosClient';

export const toggleDialog = () => ({ type: 'TOGGLE_DIALOG' });

export const onSelectShowtime = (showtime) => ({
	type: 'SELECT_SHOWTIME',
	payload: showtime,
});

export const selectShowtime = (showtime) => ({
	type: 'SELECT_SHOWTIMES',
	payload: showtime,
});

export const selectAllShowtimes = () => ({ type: 'SELECT_ALL_SHOWTIMES' });

export const getAllShowtime = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`showtimes`);
			dispatch({
				type: 'GET_ALL_SHOWTIME',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getShowtimeDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`showtimes/${id}`);
			dispatch({
				type: 'GET_SHOWTIME_DETAIL',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getShowtimeByTheater = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`showtimes/theaters/${id}`);
			dispatch({
				type: 'GET_SHOWTIME_BY_THEATER',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addShowtime = (movieId, theaterId, showDate, timeStart) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(
				`showtimes/movies/${movieId}/theaters/${theaterId}`,
				{
					showDate,
					timeStart,
				}
			);
			dispatch({
				type: 'ADD_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const updateShowtime = (
	showtimeId,
	movieId,
	theaterId,
	showDate,
	timeStart
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(
				`showtimes/${showtimeId}/movies/${movieId}/theaters/${theaterId}`,
				{
					showDate,
					timeStart,
				}
			);
			dispatch({
				type: 'UPDATE_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteShowtime = (showTimeId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(
				`showtimes/${showTimeId}`
			);
			dispatch({
				type: 'DELETE_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteShowtimeForce = (showTimeId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().delete(`showtimes/${showTimeId}`);
			dispatch({
				type: 'DELETE_SHOWTIME_FORCE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_SHOWTIME_MESSAGE',
				payload: message,
			});
		}
	};
};
