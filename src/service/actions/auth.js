import axiosClient from '../../shared/apis/axiosClient';

export const login = (username, password) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().post(`auth/login`, {
				username,
				password,
			});
			localStorage.setItem('token', response.data.token);
			dispatch({
				type: 'LOGIN',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const register = (
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().post(`auth/register`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			sessionStorage.setItem('currentUser', JSON.stringify(response.data));
			sessionStorage.setItem('password', password);
			sessionStorage.setItem('isAllowed', true);
			dispatch({
				type: 'REGISTER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const forgetPassword = (email) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().post(`auth/forgot`, { email });
			sessionStorage.setItem('currentUser', JSON.stringify(response.data));
			sessionStorage.setItem('isAllowed', true);
			dispatch({
				type: 'FORGET_PASSWORD',
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	sessionStorage.clear();
	dispatch({
		type: 'LOGOUT',
	});
};

export const autoLogin = (payload) => ({
	type: 'LOGIN',
	payload,
});

export const emailVerifyRegister = (
	code,
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const user = JSON.parse(sessionStorage.getItem('currentUser'));
			const expired = user.expired;
			const now = new Date().getTime();
			if (now <= expired) {
				if (code === user.verificationCode) {
					await axiosClient()
						.post(`auth/register/verify`, {
							firstName,
							lastName,
							phoneNumber,
							email,
							password,
							gender,
						})
						.then(() => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY_REGISTER',
						payload: 'Success',
					});
				} else {
					dispatch({
						type: 'SET_AUTH_MESSAGE',
						payload: 'Wrong verification code',
					});
				}
			} else {
				dispatch({
					type: 'SET_AUTH_MESSAGE',
					payload: 'Verification code expired',
				});
			}
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const emailVerifyForgot = (code) => {
	return async (dispatch) => {
		try {
			const user = JSON.parse(sessionStorage.getItem('currentUser'));
			const expired = user.expired;
			const now = new Date().getTime();
			const userId = user.user;
			if (now <= expired) {
				if (code === user.verificationCode) {
					await axiosClient()
						.post(`auth/forgot/${userId}/verify`, { code })
						.then(() => {
							sessionStorage.clear();
						});
					dispatch({
						type: 'EMAIL_VERIFY_FORGOT',
						payload: 'Success',
					});
				} else {
					dispatch({
						type: 'SET_AUTH_MESSAGE',
						payload: 'Wrong verification code',
					});
				}
			} else {
				dispatch({
					type: 'SET_AUTH_MESSAGE',
					payload: 'Verification code expired',
				});
			}
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};

export const resetPassword = (password, confirmPassword) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).patch(`auth/reset`, {
				newPassword: password,
				confirmPassword: confirmPassword,
			});
			dispatch({
				type: 'RESET_PASSWORD',
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_AUTH_MESSAGE',
				payload: message,
			});
		}
	};
};
