import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Form, Col, Card, Button } from 'react-bootstrap';
import { withStyles, Select, Typography } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { ImageResize } from '../../../../../components/common';
import {
	addMovie,
	updateMovie,
	deleteMovie,
} from '../../../../../service/actions/movie';
import moment from 'moment';
import styles from './styles';
import { toast } from 'react-toastify';

class AddMovie extends Component {
	state = {
		name: '',
		duration: 0,
		description: '',
		image: '',
		trailer: '',
		releases: moment(new Date().toISOString().slice(0, 10)).format(
			'YYYY-MM-DD'
		),
		genres: [],
		display: true,
		showing: true,
		coming: false,
	};

	formatDate = (dateStr) => {
		const [year, month, day] = dateStr.split('-');
		let newDate = `${day}-${month}-${year}`;
		return newDate;
	};

	componentWillUnmount() {
		this.setState = (state, callback) => {
			return;
		};
	}

	componentDidMount() {
		if (this.props.edit) {
			const { name, duration, description, image, trailer, releases, genres } =
				this.props.edit;
			this.setState({
				name: name,
				duration: duration,
				description: description,
				image: image,
				trailer: trailer,
				releases: this.formatDate(releases),
				genres: genres,
			});
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.movie !== this.props.movie) {
			const { name, duration, description, image, trailer, releases, genres } =
				this.props.movie;
			this.setState({
				name,
				duration,
				description,
				image,
				trailer,
				releases,
				genres,
			});
		}
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

	onAddMovie = async () => {
		const { name, duration, description, image, trailer, releases, genres } =
			this.state;
		await this.props.addMovie(
			name,
			duration,
			description,
			image,
			trailer,
			moment(releases).format('DD-MM-YYYY'),
			genres,
			display
		);
		this.props.movie.message !== ''
			? toast.success(this.props.movie.message)
			: toast.error('Insert failed! Server error');
	};

	onUpdateMovie = async () => {
		const {
			name,
			duration,
			description,
			image,
			trailer,
			releases,
			genres,
			display,
		} = this.state;
		await this.props.updateMovie(
			this.props.edit.id,
			name,
			duration,
			description,
			image,
			trailer,
			moment(releases).format('DD-MM-YYYY'),
			genres,
			display
		);
		this.props.movie.message !== 'undefined'
			? toast.success(this.props.movie.message)
			: toast.error('Update failed! Server error');
	};

	onRemoveMovie = async () => {
		const { name } = this.state;
		await this.props
			.deleteMovie(this.props.edit.id)
			.then(() => window.location.reload());
		this.props.movie.message !== 'undefined'
			? toast.success('Successfully deleted: ' + name)
			: toast.error('Delete failed! Server error');
	};

	render() {
		const { classes, className, genre } = this.props;
		const {
			name,
			duration,
			description,
			image,
			trailer,
			releases,
			genres,
			display,
		} = this.state;

		const rootClassName = classNames(classes.root, className);
		const title = this.props.edit ? 'Edit Movie' : 'Add Movie';
		const submitButton = this.props.edit ? 'Update Movie' : 'Save Details';
		const submitAction = this.props.edit
			? () => this.onUpdateMovie().then(() => window.location.reload())
			: () => this.onAddMovie().then(() => window.location.reload());

		return (
			<div className={rootClassName}>
				<Container fluid>
					<Typography variant="h4" className={classes.title}>
						{title}
					</Typography>
					<hr />
					<Row>
						<Col xs={12} lg={8}>
							<Card className="border-0">
								<Card.Body>
									<Row>
										<Col md={4}>
											<Card className="scroll card">
												<Card.Body className="card-body">
													<ImageResize
														url={image}
														className="img-fluid img-resize"
														alt="image"
													/>
												</Card.Body>
											</Card>
										</Col>
										<Col md={8}>
											<Form.Group autoComplete="off" noValidate>
												<Form.Label>Movie Name</Form.Label>
												<Form.Control
													label="Title"
													type="text"
													placeholder="Please specify the title"
													value={name || ''}
													onChange={(event) =>
														this.handleFieldChange('name', event.target.value)
													}
												/>
												<Form.Label className="pt-2">Genres</Form.Label>
												{this.props.edit ? (
													<Select
														multiple
														className={classes.textFieldSelect}
														required
														value={genres || []}
														variant="outlined"
														onChange={(event) =>
															this.handleFieldChange(
																'genres',
																event.target.value
															)
														}
													>
														{genres?.map((genreItem) => (
															<MenuItem key={genreItem.id} value={genreItem}>
																{genreItem.name}
															</MenuItem>
														))}
													</Select>
												) : (
													<Select
														multiple
														className={classes.textFieldSelect}
														required
														value={genres || []}
														variant="outlined"
														onChange={(event) =>
															this.handleFieldChange(
																'genres',
																event.target.value
															)
														}
													>
														{genre.genres.map((genreItem) => (
															<MenuItem key={genreItem.id} value={genreItem}>
																{genreItem.name}
															</MenuItem>
														))}
													</Select>
												)}
												<Row>
													<Col>
														<Form.Label className="pt-2">
															Release date
														</Form.Label>
														<Form.Control
															type="date"
															label="Release date"
															value={releases || ''}
															onChange={(event) =>
																this.handleFieldChange(
																	'releases',
																	event.target.value
																)
															}
														/>
													</Col>
													<Col>
														<Form.Label className="pt-2">
															Duration (minutes)
														</Form.Label>
														<Form.Control
															type="number"
															label="Duration"
															placeholder="Please specify the duration"
															value={duration || 0}
															onChange={(event) =>
																this.handleFieldChange(
																	'duration',
																	event.target.value
																)
															}
														/>
													</Col>
												</Row>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group>
										<Form.Label>Description</Form.Label>
										<Form.Control
											type="text"
											as="textarea"
											rows={3}
											value={description || ''}
											onChange={(event) =>
												this.handleFieldChange(
													'description',
													event.target.value
												)
											}
										/>
									</Form.Group>
								</Card.Body>
							</Card>
						</Col>
						<Col md={4} xs={12}>
							<p className="text-display-xs-bold">File Upload</p>
							<Form.Group className="d-flex align-items-center">
								<Form.Control
									className={classes.upload}
									type="text"
									value={image || ''}
									onChange={(event) =>
										this.handleFieldChange('image', event.target.value)
									}
								/>
							</Form.Group>
							<p className="text-display-xs-bold">Trailer Upload</p>
							<Form.Group className="d-flex align-items-center">
								<Form.Control
									className={classes.upload}
									type="text"
									value={trailer || ''}
									onChange={(event) =>
										this.handleFieldChange('trailer', event.target.value)
									}
								/>
							</Form.Group>
							<p className="text-display-xs-bold">Display</p>
							<Form.Group>
								<Form.Control
									as="select"
									name="display"
									value={display}
									onChange={(e) =>
										this.setState((prevState) => ({
											display: !prevState.display,
										}))
									}
								>
									<option>true</option>
									<option>false</option>
								</Form.Control>
							</Form.Group>
						</Col>
						<Col>
							<Button
								className={classes.buttonFooter}
								variant="primary"
								block
								onClick={submitAction}
							>
								{submitButton}
							</Button>
							{/* {this.props.edit && (
								<Button
									className={classes.buttonFooter}
									variant="secondary"
									block
									onClick={this.onRemoveMovie}
								>
									Delete Movie
								</Button>
							)} */}
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

AddMovie.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object,
	movie: PropTypes.object,
};

const mapStateToProps = (state) => ({
	movie: state.movie,
	genre: state.genre,
});

const mapDispatchToProps = { addMovie, updateMovie, deleteMovie };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AddMovie));
