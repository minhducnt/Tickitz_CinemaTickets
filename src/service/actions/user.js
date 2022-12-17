import axiosClient from '../../shared/apis/axiosClient';

export const getAllUser = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`users/`);
			dispatch({
				type: 'GET_ALL_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getUserDetail = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			await axiosClient(token)
				.post(`users`, { token })
				.then(async (res) => {
					const { data } = res;
					const response = await axiosClient().get(`users/${data.id}`);
					localStorage.setItem('currentUser', JSON.stringify(response.data));
					dispatch({
						type: 'GET_USER_DETAIL',
						payload: response.data,
						message: response.data.message,
					});
				});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getUserDetailById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`users/${id}`);
			dispatch({
				type: 'GET_USER_DETAIL_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const addUser = (
	firstName,
	lastName,
	phoneNumber,
	email,
	password,
	gender
) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`users`, {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				gender,
			});
			dispatch({
				type: 'ADD_USER',
				payload: response.data.results,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const updateUser = (userId, data) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(`users/${userId}`, data);
			dispatch({
				type: 'UPDATE_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteUser = (userId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`users/${userId}`);
			dispatch({
				type: 'DELETE_MOVIE',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const changePassword = (userId, data) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).put(
				`users/changepassword/${userId}`,
				data
			);
			dispatch({
				type: 'CHANGE_PASSWORD',
				payload: response.data,
				message: 'Change password successfully',
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_USER_MESSAGE',
				payload: message,
			});
		}
	};
};
