import axiosClient from '../../shared/apis/axiosClient';

export const createOrder = (order) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`orders`, order);
			sessionStorage.setItem('order', JSON.stringify(response.data));
			dispatch({
				type: 'CREATE_ORDER',
				payload: response.data,
				message: 'Booking Ticket successfully',
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllOrders = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders`);
			dispatch({
				type: 'GET_ALL_ORDER',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getOrderById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/${id}`);
			dispatch({
				type: 'GET_ODER_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllOrdersByUser = (userId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/users/${userId}`);
			dispatch({
				type: 'GET_ALL_ORDER_BY_USER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getAllOrderDetailsByOrder = (orderId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/${orderId}/detail`);
			dispatch({
				type: 'GET_ALL_ORDER_DETAILS_BY_ORDER',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const getOrderDetailsById = (orderId) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`orders/detail/${orderId}`);
			dispatch({
				type: 'GET_ORDER_DETAILS_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const updateOrder = (id) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).post(`/pay/orders/${id}`);
			sessionStorage.setItem('order', JSON.stringify(response.data));
			dispatch({
				type: 'UPDATE_ORDER',
				payload: response.data,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};

export const deleteOrderById = (orderId) => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axiosClient(token).delete(`orders/${orderId}`);
			dispatch({
				type: 'DELETE_ORDER_BY_ID',
				payload: response.data,
				message: response.data.message,
			});
		} catch (err) {
			const { message } = err.response.data;
			dispatch({
				type: 'SET_ORDER_MESSAGE',
				payload: message,
			});
		}
	};
};
