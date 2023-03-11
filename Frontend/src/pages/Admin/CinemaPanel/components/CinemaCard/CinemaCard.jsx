import React from 'react';
import classNames from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';
import { Paper, ImageResize } from '../../../../../components/common/index';
import { tmdbAPI } from '../../../../../shared/apis/tmdbApi';
import { EventSeat } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		paddingBottom: theme.spacing(2),
		cursor: 'pointer',
	},
	imageWrapper: {
		height: '200px',
		margin: '0 auto',
		overflow: 'hidden',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		'object-fit': 'cover',
	},
	stats: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(3),
	},
	eventIcon: {
		color: theme.palette.text.secondary,
	},
	eventText: {
		textTransform: 'capitalize',
		marginLeft: theme.spacing(2),
		color: theme.palette.text.secondary,
	},
}));

function CinemaCard(props) {
	const classes = useStyles(props);
	const { className, cinema } = props;
	const cinemaImage =
		cinema && cinema.image
			? cinema.image
			: 'https://source.unsplash.com/featured/?cinema';

	const rootClassName = classNames(classes.root, className);
	return (
		<Paper className={rootClassName}>
			<div className={classes.imageWrapper}>
				<ImageResize
					url={cinemaImage}
					imageError={tmdbAPI.imageOriginal('4gqDdWoTf1wNOiliYWXMMSIlBnK.jpg')}
					className={classes.image}
					alt="banner"
				/>
			</div>
			<div className={classes.stats}>
				<EventSeat className={classes.eventIcon} />
				<Typography className={classes.eventText} variant="h4">
					{cinema.name}
				</Typography>
			</div>
		</Paper>
	);
}

export default CinemaCard;
