import axiosClient from '../../shared/apis/axiosClient';

export const requestPayment = () => {
	return async (dispatch) => {
		var session_url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
		var username =
			'AetxIwjkrB2qYM7sSjRwN8yVQ8zEEeBa3dPexEqLVl5NEDfGtBjGUJoMTxV1hlAFzzDAh0Imm6Mib4Am';
		var password =
			'EOMkT3cerITkv_z1MbsjNz2J82NMzTojKmawNEJU2hA4mszOwnsR4MbsCxn7E7A3Ar_ZXEqO5nxPuWbs';
		var basicAuth = 'Basic ' + btoa(username + ':' + password);
		await fetch(session_url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-Language': 'en_US',
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: basicAuth,
			},
			body: 'grant_type=client_credentials',
		})
			.then((response) => response.json())
			.then(async (data) => {
				dispatch({
					type: 'REQUEST_PAYMENT',
					payload: data.access_token,
				});
			})
			.catch(function (error) {
				let errorMsg = error.message;
				dispatch({
					type: 'SET_PAYMENT_MESSAGE',
					payload: errorMsg,
				});
			});
	};
};

export const createPayment = (token, total) => {
	return async (dispatch) => {
		var session_url = 'https://api-m.sandbox.paypal.com/v1/payments/payment';
		await fetch(session_url, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-Language': 'en_US',
				'Content-Type': 'application/json',
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				intent: 'authorize',
				payer: {
					payment_method: 'paypal',
				},
				transactions: [
					{
						amount: {
							currency: 'USD',
							total: total,
						},
					},
				],
				redirect_urls: {
					return_url: 'http://localhost:3000/ticket-result',
					cancel_url: 'http://localhost:3000/*',
				},
			}),
		})
			.then((response) => response.json())
			.then(async (data) => {
				console.log(data);
				dispatch({
					type: 'CREATE_PAYMENT',
					payload: data.links,
				});
			})

			.catch(function (error) {
				let errorMsg = error.message;
				dispatch({
					type: 'SET_PAYMENT_MESSAGE',
					payload: errorMsg,
				});
			});
	};
};
