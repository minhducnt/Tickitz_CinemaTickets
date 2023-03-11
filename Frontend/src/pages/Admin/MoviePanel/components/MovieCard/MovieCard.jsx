import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles, Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Paper, Image } from '../../../../../components/common';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
		paddingBottom: theme.spacing(2),
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
	details: { padding: theme.spacing(3) },
	title: {
		fontSize: '25px',
		lineHeight: '21px',
		marginTop: theme.spacing(2),
		textTransform: 'capitalize',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	description: {
		lineHeight: '16px',
		height: theme.spacing(2),
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		color: theme.palette.text.secondary,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	stats: {
		display: 'flex',
		alignItems: 'center',
		paddingTop: theme.spacing(1),
		paddingLeft: theme.spacing(3),
	},
	updateIcon: {
		color: theme.palette.text.secondary,
	},
	updateText: {
		marginLeft: theme.spacing(1),
		color: theme.palette.text.secondary,
	},
}));

function MovieCard(props) {
	const classes = useStyles(props);
	const { className, movie } = props;
	const rootClassName = classNames(classes.root, className);
	return (
		<Paper className={rootClassName}>
			<div className={classes.imageWrapper}>
				<Image alt="movie" className={classes.image} url={movie.image} />
			</div>
			<div className={classes.details}>
				<Typography className={classes.title}>{movie.name}</Typography>
				<Typography className={classes.description} variant="body1">
					{movie.description}
				</Typography>
			</div>
			<div className={classes.stats}>
				<AccessTimeIcon className={classes.updateIcon} />
				<Typography className={classes.updateText} variant="body2">
					{movie.duration} minutes
				</Typography>
			</div>
		</Paper>
	);
}

MovieCard.propTypes = {
	movie: PropTypes.object.isRequired,
};

export default MovieCard;
