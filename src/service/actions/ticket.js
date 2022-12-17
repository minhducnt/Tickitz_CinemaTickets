import axiosClient from '../../shared/apis/axiosClient';

export const getTickets = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`tickets`);
			dispatch({
				type: 'GET_ALL_TICKET',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getTicketById = (ticketId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`tickets/${ticketId}`);
			dispatch({
				type: 'GET_TICKET_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getTicketsByShowtime = (showtimeId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(
				`tickets/showtimes/${showtimeId}`
			);
			dispatch({
				type: 'GET_TICKET_BY_SHOWTIME',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: err,
			});
		}
	};
};

export const addTicket = (showtimeId, seatId, seat, showtime) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: '',
				message: '',
			});
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(
				`tickets/showtimes/${showtimeId}/seats/${seatId}`,
				{
					seat,
					showtime,
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
				type: 'SET_MOVIE_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addManyTickets = (showtimeId, seat) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(
				`tickets/showtimes/${showtimeId}`,
				seat
			);
			dispatch({
				type: 'ADD_MANY_TICKETS',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteTicket = (ticketId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`tickets/${ticketId}`);
			dispatch({
				type: 'DELETE_TICKET',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_TICKET_MESSAGE',
				payload: message,
			});
		}
	};
};
