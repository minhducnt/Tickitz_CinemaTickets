import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const formatVND = (money) =>
	money?.toLocaleString('vi', { style: 'currency', currency: 'VND' });

export const calculateSumMoney = (array, keyObj) => {
	const total = array?.reduce(function (prevValue, currentValue) {
		return prevValue + currentValue[keyObj];
	}, 0);
	return formatVND(total);
};

export const sortArrayDescending = (array, key) =>
	array.sort((a, b) => b[key] - a[key]);

export const removeEmptyStringProperties = (obj) => {
	Object.keys(obj).forEach((key) => {
		let value = obj[key];
		let hasProperties = value && Object.keys(value).length > 0;
		if (value === '') {
			delete obj[key];
		} else if (typeof value !== 'string' && hasProperties) {
			removeEmptyStringProperties(value);
		}
	});
	return obj;
};

export const commaSeparation = (array, key) => {
	const count = array.length - 1;
	return array.map((item, index) => {
		if (index === count) return <span key={index}>{item[key]}</span>;
		return <span key={index}>{item[key] + ', '}</span>;
	});
};

export const commaHashtagSeparation = (array, key) => {
	const count = array.length - 1;
	return array.map((item, index) => {
		if (index === count) return <span key={index}>#{item[key]}</span>;
		return <span key={index}>#{item[key] + ', '}</span>;
	});
};

export const textTruncate = (text, length, ending) => {
	if (length == null) {
		length = 100;
	}
	if (ending == null) {
		ending = '...';
	}
	if (text.length > length) {
		return text.substring(0, length - ending.length) + ending;
	} else {
		return text;
	}
};

export const match = (term, array, key) => {
	const reg = new RegExp(term.split('').join('.*'), 'i');
	return array.filter((item) => item[key] && item[key].match(reg));
};

export default function ScrollToTop() {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
}

export const scrollTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});
};

export const scrollBanner = () => {
	window.scrollTo({
		top: 750,
		behavior: 'smooth',
	});
};

export const scrollMovies = () => {
	window.scrollTo({
		top: 1280,
		behavior: 'smooth',
	});
};

export const capitalizeFirstLowercaseRest = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
