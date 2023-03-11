const initialState = {
	movies: [],
	displaying: [],
	latestMovies: [],
	nowShowing: [],
	comingSoon: [],
	randomMovie: null,
	selectedMovie: null,
	details: {},
	message: '',
	pageNumber: '',
	totalPages: '',
};

const movieReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_MOVIES': {
			return {
				...state,
				movies: action.payload.content,
				pageNumber: action.payload.pageNumber,
				pageSize: action.payload.pageSize,
			};
		}
		case 'GET_ALL_MOVIE': {
			const latestMovies = action.payload
				.sort((a, b) => Date.parse(b.releases) - Date.parse(a.releases))
				.slice(0, 5);
			const randomMovie =
				action.payload[Math.floor(Math.random() * action.payload.length)];
			return {
				...state,
				movies: action.payload,
				latestMovies,
				randomMovie,
				message: action.message,
			};
		}
		case 'GET_MOVIE_WITH_PAGINATION': {
			return {
				...state,
				movies: action.payload.content,
				pageNumber: action.payload.pageNumber,
				totalPages: action.payload.totalPages,
			};
		}
		case 'SEARCH_MOVIE_BY_NAME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'SELECT_MOVIE': {
			return { ...state, selectedMovie: action.payload };
		}
		case 'GET_MOVIE_DETAIL': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'GET_MOVIE_BY_DISPLAY': {
			return {
				...state,
				displaying: action.payload,
				message: action.message,
			};
		}
		case 'GET_MOVIE_BY_SHOWING': {
			return {
				...state,
				nowShowing: action.payload,
				message: action.message,
			};
		}
		case 'GET_MOVIE_BY_COMING': {
			return {
				...state,
				comingSoon: action.payload,
				message: action.message,
			};
		}
		case 'ADD_MOVIE': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_MOVIE': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_MOVIE': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'SET_MOVIE_MESSAGE': {
			return {
				...state,
				errorMsg: action.payload,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default movieReducer;
