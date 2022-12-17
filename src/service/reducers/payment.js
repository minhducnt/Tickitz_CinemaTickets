const initialState = {
	accessToken: '',
	payment: [],
	message: '',
	errorMsg: '',
};

const paymentReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'REQUEST_PAYMENT': {
			return {
				...state,
				accessToken: action.payload,
				message: action.message,
			};
		}
		case 'CREATE_PAYMENT': {
			return {
				...state,
				payment: action.payload,
				message: action.message,
			};
		}
		case 'SET_PAYMENT_MESSAGE': {
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

export default paymentReducer;
