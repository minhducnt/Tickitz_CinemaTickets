import axiosClient from '../../shared/apis/axiosClient';

export const onSelectMovie = (movie) => ({
	type: 'SELECT_MOVIE',
	payload: movie,
});

export const getMovies = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies`);
			dispatch({
				type: 'GET_MOVIES',
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

export const getAllMovie = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies`);
			dispatch({
				type: 'GET_ALL_MOVIE',
				payload: response.data.content,
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

export const getMovieWithPagination = (pageNumber) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(
				`movies?pageNumber=${pageNumber}`
			);
			dispatch({
				type: 'GET_MOVIE_WITH_PAGINATION',
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

export const searchMovieByName = (name) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/search/${name}`);
			dispatch({
				type: 'SEARCH_MOVIE_BY_NAME',
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

export const getMovieByDisplay = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/display=true`);
			dispatch({
				type: 'GET_MOVIE_BY_DISPLAY',
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

export const getMovieByShowing = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/showing=true`);
			dispatch({
				type: 'GET_MOVIE_BY_SHOWING',
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

export const getMovieByComing = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/coming=true`);
			dispatch({
				type: 'GET_MOVIE_BY_COMING',
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

export const getMovieDetail = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`movies/${id}`);
			dispatch({
				type: 'GET_MOVIE_DETAIL',
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

export const addMovie = (
	name,
	duration,
	description,
	image,
	trailer,
	releases,
	genres
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`movies`, {
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
			});
			dispatch({
				type: 'ADD_MOVIE',
				payload: response.data,
				message: 'Successfully added',
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

export const updateMovie = (
	movieId,
	name,
	duration,
	description,
	image,
	trailer,
	releases,
	genres,
	display,
	showing,
	coming
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(`movies/${movieId}`, {
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
				display,
				showing,
				coming,
			});
			dispatch({
				type: 'UPDATE_MOVIE',
				payload: response.data,
				message: 'Successfully updated',
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

export const deleteMovie = (movieId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`movies/${movieId}`);
			if (response.ok) {
				dispatch(getAllMovie());
				dispatch(onSelectMovie(null));
			}
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_MOVIE_MESSAGE',
				payload: message,
			});
		}
	};
};
