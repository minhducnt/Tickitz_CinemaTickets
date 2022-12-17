import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 120,
		backgroundColor: 'transparent',
		borderRadius: 0,
		color: theme.palette.common.black,
		boxShadow: 'unset',
	},
	media: {
		height: 30,
	},
	h5: {
		textTransform: 'capitalize',
	},
}));

const ShowtimeCardSimple = (props) => {
	const classes = useStyles();
	const { showtime } = props;
	return (
		<Card className={classes.card}>
			<CardActionArea>
				<CardContent>
					<Typography
						className={classes.h5}
						gutterBottom
						variant="h6"
						component="h2"
						color="inherit"
					>
						{showtime.day}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

ShowtimeCardSimple.propTypes = {
	showtime: PropTypes.object.isRequired,
};
export default ShowtimeCardSimple;
