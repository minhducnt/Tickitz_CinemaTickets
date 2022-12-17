import axiosClient from '../../shared/apis/axiosClient';

export const createTheater = (theaterName) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`theaters`, theaterName);
			dispatch({
				type: 'CREATE_THEATER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const updateTheater = (theaterName) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(`theaters`, theaterName);
			dispatch({
				type: 'UPDATE_THEATER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllTheater = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`theaters`);
			dispatch({
				type: 'GET_ALL_THEATER',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getTheaterById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`theaters/${id}`);
			dispatch({
				type: 'GET_THEATER_DETAIL',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: message,
			});
		}
	};
};
