import { default as axios } from 'axios';
const { REACT_APP_API: API_URL } = process.env;

const axiosClient = (token = null) => {
	const headers = token && {
		'Content-Type': 'application/json',
		authorization: `Bearer ${token}`,
	};
	return axios.create({
		baseURL: API_URL,
		headers,
	});
};

export default axiosClient;
