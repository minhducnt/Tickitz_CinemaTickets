import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Container, Row, Form, Col, Card, Button } from 'react-bootstrap';
import styles from './styles';
import { createGenre } from '../../../../../service/actions/genre';

class AddGenre extends Component {
	state = {
		genreName: '',
	};

	async componentDidMount() {
		if (this.props.selectedGenres) {
			const { genre } = this.props.selectedGenres;
			this.setState({
				genreName: genre.name,
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

	onAddGenre = () => {
		const { genreName } = this.state;
		this.props.createGenre(genreName);
	};

	render() {
		const { classes, className } = this.props;
		const { genreName } = this.state;

		const rootClassName = classNames(classes.root, className);
		const title = 'Add Genre';
		const submitButton = 'Save Details';

		const submitAction = () => this.onAddGenre();

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
												<Form.Label>Genre Name</Form.Label>
												<Form.Control
													label="Title"
													type="text"
													placeholder="Please specify the title"
													value={genreName}
													onChange={(event) =>
														this.handleFieldChange(
															'genreName',
															event.target.value
														)
													}
												/>
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

AddGenre.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	genre: state.genre.genres,
});

const mapDispatchToProps = {
	createGenre,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(AddGenre));
