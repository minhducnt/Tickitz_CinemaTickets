import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './assets/styles/GlobalStyles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './app/App';
//Styles
import './assets/styles/reset.scss';
import './assets/styles/main.scss';
import './assets/styles/custom.scss';
import 'antd/dist/antd.min.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

ReactDOM.render(
	<React.Fragment>
		<GlobalStyle />
		<App />
		<ToastContainer />
	</React.Fragment>,
	document.getElementById('root')
);

reportWebVitals();
