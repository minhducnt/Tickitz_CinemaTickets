import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Box, Chip } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { match } from '../../../shared/utils/utils';
import {
	getMovieWithPagination,
	getMovieByComing,
	getMovieByDisplay,
	getMovieByShowing,
	onSelectMovie,
} from '../../../service/actions/movie';
import { getAllGenre } from '../../../service/actions/genre';
//Component
import { MovieToolbar, MovieCard, AddMovie } from './components';
import { ResponsiveDialog } from '../../../components/common';
//Styles
import { scrollTop } from '../../../shared/utils/utils';
import styles from './styles';

class MoviePanel extends Component {
	state = {
		search: '',
		pageNumber: 1,
		isAll: true,
		isComing: false,
		isDisplaying: false,
		isShowing: false,
	};

	async componentDidMount() {
		const {
			movie,
			getMovieWithPagination,
			getMovieByComing,
			getMovieByDisplay,
			getMovieByShowing,
			genre,
			getAllGenre,
		} = this.props;
		if (!movie.length) {
			await getMovieWithPagination(this.state.pageNumber);
			await getMovieByComing();
			await getMovieByDisplay();
			await getMovieByShowing();
		}

		if (!genre.length) getAllGenre();
	}
	componentDidUpdate(prevProps, prevState) {
		const { movie, getMovieWithPagination } = this.props;
		if (prevState.pageNumber !== this.state.pageNumber) {
			if (!movie.length) getMovieWithPagination(this.state.pageNumber);
			scrollTop();
		}
	}
	handleChangePage = (event, pageNumber) => {
		this.setState({ pageNumber });
	};

	handleAll = () => {
		this.setState({
			isAll: true,
			isComing: false,
			isDisplaying: false,
			isShowing: false,
		});
	};

	handleComing = () => {
		this.setState({
			isAll: false,
			isComing: true,
			isDisplaying: false,
			isShowing: false,
		});
	};

	handleDisplay = () => {
		this.setState({
			isAll: false,
			isComing: false,
			isDisplaying: true,
			isShowing: false,
		});
	};

	handleShowing = () => {
		this.setState({
			isAll: false,
			isComing: false,
			isDisplaying: false,
			isShowing: true,
		});
	};

	renderMovies() {
		const { classes } = this.props;
		const { isAll, isDisplaying } = this.state;
		//const {isComing ,isShowing } = this.state;
		const movies = match(this.state.search, this.props.movie.movies, 'name');
		const display = match(
			this.state.search,
			this.props.movie.displaying,
			'name'
		);
		// const coming = match(
		// 	this.state.search,
		// 	this.props.movie.comingSoon,
		// 	'name'
		// );
		// const showing = match(
		// 	this.state.search,
		// 	this.props.movie.nowShowing,
		// 	'name'
		// );
		if (!movies.length) {
			return (
				<div className={classes.progressWrapper}>
					<CircularProgress />
				</div>
			);
		}
		if (!display.length) {
			return (
				<div className={classes.progressWrapper}>
					<CircularProgress />
				</div>
			);
		}
		// if (!coming.length) {
		// 	return (
		// 		<div className={classes.progressWrapper}>
		// 			<CircularProgress />
		// 		</div>
		// 	);
		// }
		// if (!showing.length) {
		// 	return (
		// 		<div className={classes.progressWrapper}>
		// 			<CircularProgress />
		// 		</div>
		// 	);
		// }
		if (isAll === true) {
			return (
				<div className={classes.content}>
					<Grid container spacing={3}>
						{movies.map((movie) => (
							<Grid
								item
								key={movie.id}
								lg={4}
								md={6}
								xs={12}
								onClick={() => this.props.onSelectMovie(movie)}
							>
								<MovieCard movie={movie} />
							</Grid>
						))}
					</Grid>
					<Box my={2} display="flex" justifyContent="center">
						<Pagination
							color="secondary"
							size="large"
							count={parseInt(this.props.movie.totalPages)}
							page={this.state.pageNumber}
							onChange={this.handleChangePage}
						/>
					</Box>
				</div>
			);
		}
		// if (isComing === true) {
		// 	return (
		// 		<Grid container spacing={3}>
		// 			{coming.map((movie) => (
		// 				<Grid
		// 					item
		// 					key={movie.id}
		// 					lg={4}
		// 					md={6}
		// 					xs={12}
		// 					onClick={() => this.props.onSelectMovie(movie)}
		// 				>
		// 					<MovieCard movie={movie} />
		// 				</Grid>
		// 			))}
		// 		</Grid>
		// 	);
		// }
		if (isDisplaying === true) {
			return (
				<Grid container spacing={3}>
					{display.map((movie) => (
						<Grid
							item
							key={movie.id}
							lg={4}
							md={6}
							xs={12}
							onClick={() => this.props.onSelectMovie(movie)}
						>
							<MovieCard movie={movie} />
						</Grid>
					))}
				</Grid>
			);
		}
		// if (isShowing === true) {
		// 	return (
		// 		<Grid container spacing={3}>
		// 			{showing.map((movie) => (
		// 				<Grid
		// 					item
		// 					key={movie.id}
		// 					lg={4}
		// 					md={6}
		// 					xs={12}
		// 					onClick={() => this.props.onSelectMovie(movie)}
		// 				>
		// 					<MovieCard movie={movie} />
		// 				</Grid>
		// 			))}
		// 		</Grid>
		// 	);
		// }
	}

	render() {
		const { classes, selectedMovie } = this.props;
		return (
			<div className={classes.root}>
				<MovieToolbar
					search={this.state.search}
					onChangeSearch={(e) => this.setState({ search: e.target.value })}
				/>
				<div className={classes.content}>
					<div className={classes.rowChip}>
						<Chip
							className={classes.chip}
							label="All"
							clickable
							color="secondary"
							variant="outlined"
							onClick={this.handleAll}
						/>
						{/* <Chip
							className={classes.chip}
							label="Coming"
							clickable
							color="secondary"
							variant="outlined"
							onClick={this.handleComing}
						/> */}
						<Chip
							className={classes.chip}
							label="Display"
							clickable
							color="secondary"
							variant="outlined"
							onClick={this.handleDisplay}
						/>
						{/* <Chip
							className={classes.chip}
							label="Showing"
							clickable
							color="secondary"
							variant="outlined"
							onClick={this.handleShowing}
						/> */}
					</div>
					{this.renderMovies()}
				</div>
				<ResponsiveDialog
					id="Edit-movie"
					open={Boolean(selectedMovie)}
					handleClose={() => {
						this.props.onSelectMovie(null);
					}}
				>
					<AddMovie edit={selectedMovie} />
				</ResponsiveDialog>
			</div>
		);
	}
}

MoviePanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	movie: state.movie,
	genre: state.genre.genres,
	selectedMovie: state.movie.selectedMovie,
});

const mapDispatchToProps = {
	getMovieWithPagination,
	getMovieByComing,
	getMovieByDisplay,
	getMovieByShowing,
	getAllGenre,
	onSelectMovie,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(MoviePanel));
