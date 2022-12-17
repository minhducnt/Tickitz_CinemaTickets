import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles, Button } from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import ShowtimeCard from '../ShowtimeCard/ShowtimeCard';

import styles from './styles';

const useStyles = makeStyles(styles);

function NextArrow(props) {
	const { currentSlide, slideCount, onClick } = props;
	const classes = useStyles({ currentSlide, slideCount });
	return (
		<div className={classnames(classes.arrow, 'nextArrow')} onClick={onClick}>
			<ArrowForwardIos color="inherit" fontSize="large" />
		</div>
	);
}

function PrevArrow(props) {
	const { currentSlide, onClick } = props;
	const classes = useStyles({ currentSlide });
	return (
		<div className={classnames(classes.arrow, 'prevArrow')} onClick={onClick}>
			<ArrowBackIos color="inherit" fontSize="large" />
		</div>
	);
}

function ShowtimeCarousel({ carouselClass, showtime = [], title, to = null }) {
	const classes = useStyles();
	const settings = {
		centerMode: false,
		infinite: true,
		speed: 500,
		slidesToShow: 7,
		swipeToSlide: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
					slidesToShow: 7,
				},
			},
			{
				breakpoint: 1250,
				settings: {
					slidesToShow: 6,
				},
			},
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 5,
				},
			},
		],
	};
	if (!showtime.length) return null;
	return (
		<div className={carouselClass}>
			<div className={classes.container}>
				{to == null ? null : (
					<Link to={to} style={{ textDecoration: 'none' }}>
						<Button className={classes.button} color="primary">
							Explore All
						</Button>
					</Link>
				)}
			</div>
			<Slider {...settings} className={classes.slider}>
				{showtime.map((showtime) => (
					<ShowtimeCard key={showtime.id} showtime={showtime} />
				))}
			</Slider>
		</div>
	);
}
export default ShowtimeCarousel;
