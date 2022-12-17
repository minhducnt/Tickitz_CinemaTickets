const initialState = {
	errorMsg: '',
	orders: [],
	details: {},
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_ORDER': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'UPDATE_ORDER': {
			return {
				...state,
				orders: action.payload,
				message: action.message,
			};
		}
		case 'GET_ALL_ORDER': {
			return {
				...state,
				orders: action.payload,
				message: action.message,
			};
		}
		case 'GET_ODER_BY_ID': {
			return {
				...state,
				orders: action.payload,
				message: action.message,
			};
		}
		case 'GET_ALL_ORDER_BY_USER': {
			return {
				...state,
				orders: action.payload,
				message: action.message,
			};
		}
		case 'GET_ALL_ORDER_DETAILS_BY_ORDER': {
			return {
				...state,
				orders: action.payload,
				message: action.message,
			};
		}
		case 'GET_ORDER_DETAILS_BY_ID': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'DELETE_ORDER_BY_ID': {
			return {
				...state,
				details: action.payload,
				message: action.message,
			};
		}
		case 'SET_ORDER_MESSAGE': {
			return {
				...state,
				errorMsg: action.payload,
				message: action.message,
			};
		}
		default: {
			return {
				...state,
			};
		}
	}
};

export default orderReducer;
