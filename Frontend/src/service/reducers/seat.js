const initialState = {
	seats: [],
	orderedSeats: [],
	selectedSeats: [],
	message: '',
	errorMsg: '',
};

const selectSeats = (state, payload) => {
	const { selectedSeats } = state;

	const selectedIndex = selectedSeats.indexOf(payload);
	let newSelected = [];

	if (selectedIndex === -1) {
		newSelected = newSelected.concat(selectedSeats, payload);
	} else if (selectedIndex === 0) {
		newSelected = newSelected.concat(selectedSeats.slice(1));
	} else if (selectedIndex === selectedSeats.length - 1) {
		newSelected = newSelected.concat(selectedSeats.slice(0, -1));
	} else if (selectedIndex > 0) {
		newSelected = newSelected.concat(
			selectedSeats.slice(0, selectedIndex),
			selectedSeats.slice(selectedIndex + 1)
		);
	}
	return {
		...state,
		selectedSeats: newSelected,
	};
};

const seatReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SELECT_SEAT':
			return selectSeats(state, action.payload);
		case 'RESET_SELECT_SEAT':
			return {
				...state,
				selectedSeats: [],
			};
		case 'GET_ALL_SEAT_AVAILABLE_BY_SHOWTIME': {
			return {
				...state,
				seats: action.payload,
				message: action.message,
			};
		}
		case 'GET_ALL_SEAT_ORDERED_BY_SHOWTIME': {
			return {
				...state,
				orderedSeats: action.payload,
				message: action.message,
			};
		}
		case 'SET_SEAT_MESSAGE': {
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

export default seatReducer;
