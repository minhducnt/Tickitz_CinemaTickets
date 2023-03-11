import axiosClient from '../../shared/apis/axiosClient';

export const toggleDialog = () => ({ type: 'TOGGLE_DIALOG' });

export const selectGenre = (genre) => ({
	type: 'SELECT_GENRE',
	payload: genre,
});

export const selectAllGenres = () => ({ type: 'SELECT_ALL_GENRES' });

export const createGenre = (genreName) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`genres`, genreName);
			dispatch({
				type: 'CREATE_GENRE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_GENRE_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllGenre = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`genres`);
			dispatch({
				type: 'GET_ALL_GENRE',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_GENRE_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getGenreById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`genres/${id}`);
			dispatch({
				type: 'GET_GENRE_DETAIL',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_GENRE_MESSAGE',
				payload: message,
			});
		}
	};
};
