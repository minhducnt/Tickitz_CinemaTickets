const initialState = {
	theaters: [],
	detail: {},
	message: '',
	errorMsg: '',
};

const showtimeReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_THEATER': {
			return {
				...state,
				theaters: action.payload,
			};
		}
		case 'GET_THEATER_DETAIL': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'CREATE_THEATER': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_THEATER': {
			return {
				...state,
				detail: action.payload,
				message: action.message,
			};
		}
		case 'SET_THEATER_MESSAGE': {
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
