const initialState = {
	genres: [],
	selectedGenres: [],
	detail: {},
	openDialog: false,
	message: '',
	errorMsg: '',
};

const toggleDialog = (state) => ({
	...state,
	openDialog: !state.openDialog,
});

const selectGenre = (state, payload) => {
	const { selectedGenres } = state;

	const selectedIndex = selectedGenres.indexOf(payload);
	let newSelected = [];

	if (selectedIndex === -1) {
		newSelected = newSelected.concat(selectedGenres, payload);
	} else if (selectedIndex === 0) {
		newSelected = newSelected.concat(selectedGenres.slice(1));
	} else if (selectedIndex === selectedGenres.length - 1) {
		newSelected = newSelected.concat(selectedGenres.slice(0, -1));
	} else if (selectedIndex > 0) {
		newSelected = newSelected.concat(
			selectedGenres.slice(0, selectedIndex),
			selectedGenres.slice(selectedIndex + 1)
		);
	}
	return {
		...state,
		selectedGenres: newSelected,
	};
};

const selectAllGenres = (state) => ({
	...state,
	selectedGenres: !state.selectedGenres.length
		? state.genres.map((genre) => genre.id)
		: [],
});

const genreReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_DIALOG':
			return toggleDialog(state);
		case 'SELECT_GENRE':
			return selectGenre(state, action.payload);
		case 'SELECT_ALL_GENRES':
			return selectAllGenres(state);
		case 'GET_ALL_GENRE': {
			return {
				...state,
				genres: action.payload,
			};
		}
		case 'GET_GENRE_DETAIL': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'CREATE_GENRE': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_GENRE': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'SET_GENRE_MESSAGE': {
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

export default genreReducer;
