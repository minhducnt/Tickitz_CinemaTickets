import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { GenreTable } from './components';
import { getAllGenre } from '../../../service/actions/genre';

class GenrePanel extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};

	async componentDidMount() {
		const { genre, getAllGenre } = this.props;
		if (!genre.length) await getAllGenre();
	}

	render() {
		const { classes, genre } = this.props;

		return (
			<div className={classes.root}>
				<div className={classes.content}>
					{!genre.length ? (
						<Typography variant="h4">There are no genres</Typography>
					) : (
						<GenreTable genres={genre} />
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	genre: state.genre.genres,
});

const mapDispatchToProps = {
	getAllGenre,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(GenrePanel));
