const initialState = {
	tickets: [],
	detail: {},
	message: '',
	errorMsg: '',
};

const ticketReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_ALL_TICKET': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'GET_TICKET_BY_SHOWTIME': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'GET_TICKET_BY_ID': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'ADD_SHOWTIME': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'ADD_MANY_TICKETS': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_TICKET': {
			return {
				...state,
				tickets: action.payload,
				message: action.message,
			};
		}
		case 'SET_TICKET_MESSAGE': {
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

export default ticketReducer;
