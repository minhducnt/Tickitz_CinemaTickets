const initialState = {
	showtimes: [],
	selectedShowtimes: [],
	selectShowtime: null,
	details: {},
	openDialog: false,
	message: '',
	errorMsg: '',
};

const toggleDialog = (state) => ({
	...state,
	openDialog: !state.openDialog,
});

const selectShowtime = (state, payload) => {
	const { selectedShowtimes } = state;

	const selectedIndex = selectedShowtimes.indexOf(payload);
	let newSelected = [];

	if (selectedIndex === -1) {
		newSelected = newSelected.concat(selectedShowtimes, payload);
	} else if (selectedIndex === 0) {
		newSelected = newSelected.concat(selectedShowtimes.slice(1));
	} else if (selectedIndex === selectedShowtimes.length - 1) {
		newSelected = newSelected.concat(selectedShowtimes.slice(0, -1));
	} else if (selectedIndex > 0) {
		newSelected = newSelected.concat(
			selectedShowtimes.slice(0, selectedIndex),
			selectedShowtimes.slice(selectedIndex + 1)
		);
	}
	return {
		...state,
		selectedShowtimes: newSelected,
	};
};

const selectAllShowtimes = (state) => ({
	...state,
	selectedShowtimes: !state.selectedShowtimes.length
		? state.showtimes.map((showtime) => showtime.id)
		: [],
});

const showtimeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOGGLE_DIALOG':
			return toggleDialog(state);
		case 'SELECT_SHOWTIME':
			return { ...state, selectShowtime: action.payload };
		case 'SELECT_SHOWTIMES':
			return selectShowtime(state, action.payload);
		case 'SELECT_ALL_SHOWTIMES':
			return selectAllShowtimes(state);
		case 'GET_ALL_SHOWTIME': {
			return {
				...state,
				showtimes: action.payload,
			};
		}
		case 'GET_SHOWTIME_DETAIL': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'GET_SHOWTIME_BY_THEATER': {
			return {
				...state,
				showtimes: action.payload,
				message: action.message,
			};
		}
		case 'ADD_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_SHOWTIME': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_SHOWTIME_FORCE': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'SET_SHOWTIME_MESSAGE': {
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

export default showtimeReducer;
