import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography, MenuItem, Select } from '@material-ui/core';
import { Container, Row, Form, Col, Card, Button } from 'react-bootstrap';
import styles from './styles';
import moment from 'moment';
import { getAllTheater } from '../../../../../service/actions/theater';
import { getAllMovie } from '../../../../../service/actions/movie';
import {
	addShowtime,
	deleteShowtime,
	deleteShowtimeForce,
} from '../../../../../service/actions/showtime';

class AddShowtime extends Component {
	state = {
		movieId: '',
		cinemaId: '',
		timeStart: '',
		showDate: new Date().toISOString(),
	};

	async componentDidMount() {
		const { movie, theater, getAllMovie, getAllTheater } = this.props;
		if (!movie.length) await getAllMovie();
		if (!theater.length) await getAllTheater();
	}

	handleChange = (e) => {
		this.setState({
			state: e.target.value,
		});
	};

	handleFieldChange = (field, value) => {
		const newState = { ...this.state };
		newState[field] = value;
		this.setState(newState);
	};

	onAddShowtime = () => {
		const { showDate, timeStart, movieId, cinemaId } = this.state;
		this.props.addShowtime(
			movieId,
			cinemaId,
			moment(showDate).format('DD-MM-YYYY'),
			timeStart
		);
	};

	render() {
		const { movie, theater, classes, className } = this.props;
		const { timeStart, showDate, movieId, cinemaId } = this.state;

		const rootClassName = classNames(classes.root, className);
		const title = this.props.selectedShowtime
			? 'Edit Showtime'
			: 'Add Showtime';
		const submitButton = this.props.selectedShowtime
			? 'Update Showtime'
			: 'Save Details';
		const submitAction = this.props.selectedShowtime
			? () => this.onUpdateShowtime()
			: () => this.onAddShowtime();

		console.log(this.props);
		console.log(this.state);

		return (
			<div className={rootClassName}>
				<Container>
					<Typography variant="h4" className={classes.title}>
						{title}
					</Typography>
					<Row>
						<Col>
							<Card className="border-0">
								<Card.Body>
									<Row>
										<Col>
											<Form.Group autoComplete="off" noValidate>
												<div>
													<Form.Label>Movie</Form.Label>
													<Select
														className={classes.textFieldSelect}
														fullWidth
														required
														value={movieId}
														variant="outlined"
														onChange={(event) =>
															this.handleFieldChange(
																'movieId',
																event.target.value
															)
														}
													>
														{movie.map((movie) => (
															<MenuItem key={movie.id} value={movie.id}>
																{movie.name}
															</MenuItem>
														))}
													</Select>
												</div>
												<div className="pt-2">
													<Form.Label>Theater</Form.Label>
													<Select
														className={classes.textFieldSelect}
														fullWidth
														required
														value={cinemaId}
														variant="outlined"
														onChange={(event) =>
															this.handleFieldChange(
																'cinemaId',
																event.target.value
															)
														}
													>
														{theater.map((theater) => (
															<MenuItem key={theater.id} value={theater.id}>
																{theater.name}
															</MenuItem>
														))}
													</Select>
												</div>
												<div className="pt-2">
													<Form.Label>Date Show</Form.Label>
													<Form.Control
														type="date"
														value={showDate}
														onChange={(event) =>
															this.handleFieldChange(
																'showDate',
																event.target.value
															)
														}
													/>
												</div>
												<div className="pt-2">
													<Form.Label>Time Start</Form.Label>
													<Select
														className={classes.textFieldSelect}
														fullWidth
														placeholder="Please specify the Time"
														required
														value={timeStart}
														variant="outlined"
														onChange={(event) =>
															this.handleFieldChange(
																'timeStart',
																event.target.value
															)
														}
													>
														{[
															'18:00',
															'19:00',
															'20:00',
															'21:00',
															'22:00',
															'23:00',
														].map((time) => (
															<MenuItem key={`time-${time}`} value={time}>
																{time}
															</MenuItem>
														))}
													</Select>
												</div>
											</Form.Group>
										</Col>
									</Row>
								</Card.Body>
							</Card>
						</Col>
						<Button
							className={classes.buttonFooter}
							color="primary"
							block
							onClick={submitAction}
						>
							{submitButton}
						</Button>
					</Row>
				</Container>
			</div>
		);
	}
}

AddShowtime.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	theater: state.theater.theaters,
	movie: state.movie.movies,
	showtimes: state.showtime,
});

const mapDispatchToProps = {
	getAllTheater,
	getAllMovie,
	addShowtime,
	deleteShowtime,
	deleteShowtimeForce,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AddShowtime));
