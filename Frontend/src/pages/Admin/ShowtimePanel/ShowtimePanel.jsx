import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { AddShowtime, ShowtimesToolbar, ShowtimesTable } from './components';
import {
	getAllShowtime,
	toggleDialog,
	selectShowtime,
	selectAllShowtimes,
	deleteShowtime,
} from '../../../service/actions/showtime';
import { getAllTheater } from '../../../service/actions/theater';
import { getMovieByDisplay } from '../../../service/actions/movie';
import { ResponsiveDialog } from '../../../components/common';
import { toast } from 'react-toastify';

class ShowtimeList extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};

	async componentDidMount() {
		const {
			showtimes,
			movie,
			theater,
			getAllShowtime,
			getMovieByDisplay,
			getAllTheater,
		} = this.props;
		if (!movie.length) await getMovieByDisplay();
		if (!showtimes.length) await getAllShowtime();
		if (!theater.length) await getAllTheater();
	}

	handleDeleteShowtime = () => {
		const { selectedShowtimes, deleteShowtime, showtime } = this.props;
		console.log(showtime);
		selectedShowtimes.forEach((element) => deleteShowtime(element));
		showtime.message !== ''
			? toast.success('Successfully Deleted')
			: toast.error(this.props.showtime.errorMsg);
	};

	render() {
		const {
			classes,
			showtimes,
			selectedShowtimes,
			openDialog,
			toggleDialog,
			selectShowtime,
			selectAllShowtimes,
		} = this.props;
		return (
			<div className={classes.root}>
				<ShowtimesToolbar
					showtimes={showtimes}
					toggleDialog={toggleDialog}
					selectedShowtimes={selectedShowtimes}
					deleteShowtime={this.handleDeleteShowtime}
				/>
				<div className={classes.content}>
					{!showtimes.length ? (
						<Typography variant="h4">There are no showtimes</Typography>
					) : (
						<ShowtimesTable
							onSelectShowtime={selectShowtime}
							selectedShowtimes={selectedShowtimes}
							selectAllShowtimes={selectAllShowtimes}
							showtimes={showtimes}
						/>
					)}
				</div>
				<ResponsiveDialog
					id="Add-showtime"
					open={openDialog}
					handleClose={() => toggleDialog()}
				>
					<AddShowtime
						selectedShowtime={showtimes.find(
							(showtime) => showtime.id === selectedShowtimes[0]
						)}
					/>
				</ResponsiveDialog>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	openDialog: state.showtime.openDialog,
	movie: state.movie.displaying,
	showtimes: state.showtime.showtimes,
	showtime: state.showtime,
	theater: state.theater.theaters,
	selectedShowtimes: state.showtime.selectedShowtimes,
});

const mapDispatchToProps = {
	getMovieByDisplay,
	getAllShowtime,
	getAllTheater,
	toggleDialog,
	selectShowtime,
	selectAllShowtimes,
	deleteShowtime,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(ShowtimeList));
