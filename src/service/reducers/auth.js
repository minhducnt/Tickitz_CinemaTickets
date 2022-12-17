const initialState = {
	token: null,
	expired: null,
	user: null,
	message: '',
	errorMsg: '',
	isAllowed: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN': {
			return {
				...state,
				token: action.payload.token,
				expired: action.payload.expired,
				message: action.message,
				errorMsg: '',
			};
		}
		case 'REGISTER': {
			return {
				...state,
				user: action.payload.user,
				isAllowed: true,
				message: action.message,
				errorMsg: '',
			};
		}
		case 'LOGOUT': {
			return initialState;
		}
		case 'EMAIL_VERIFY_REGISTER': {
			return {
				...state,
				user: null,
				message: action.payload,
			};
		}
		case 'EMAIL_VERIFY_FORGOT': {
			return {
				...state,
				user: null,
				message: action.payload,
			};
		}
		case 'FORGET_PASSWORD': {
			return {
				...state,
				isAllowed: true,
				message: action.message,
			};
		}
		case 'RESET_PASSWORD': {
			return {
				...state,
				message: action.message,
			};
		}
		case 'SET_AUTH_MESSAGE': {
			return {
				...state,
				message: '',
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

export default authReducer;
