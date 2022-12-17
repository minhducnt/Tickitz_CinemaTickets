import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { getAllTheater } from '../../../service/actions/theater';
import { CinemaToolbar, CinemaCard } from './components';
//import { AddCinema } from './components';
//import { ResponsiveDialog } from '../../../components/common';
import { match } from '../../../shared/utils/utils';
import styles from './styles';

class CinemaPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editCinema: null,
			openEditDialog: false,
			search: '',
		};
	}

	async componentDidMount() {
		const { theater, getAllTheater } = this.props;
		if (!theater.length) await getAllTheater();
	}

	openEditDialog = (cinema) => {
		this.setState({ openEditDialog: true, editCinema: cinema });
	};

	CloseEditDialog = () => {
		this.setState({ openEditDialog: false, editCinema: null });
	};

	editCinema(cinema) {
		this.OpenEditDialog(cinema);
	}

	render() {
		const { classes, theater } = this.props;
		//const { editCinema } = this.state;
		const { search } = this.state;
		const filteredCinemas = match(search, theater, 'name');
		return (
			<div className={classes.root}>
				<CinemaToolbar
					search={this.state.search}
					onChangeSearch={(e) => this.setState({ search: e.target.value })}
				/>
				<div className={classes.content}>
					{filteredCinemas.length === 0 ? (
						<CircularProgress />
					) : (
						<Grid container spacing={3}>
							{filteredCinemas.map((cinema) => (
								<Grid
									item
									key={cinema.id}
									lg={4}
									md={6}
									xs={12}
									onClick={() => this.openEditDialog(cinema)}
								>
									<CinemaCard cinema={cinema} />
								</Grid>
							))}
						</Grid>
					)}
				</div>
				{/* <ResponsiveDialog
					id="Edit-cinema"
					open={this.state.openEditDialog}
					handleClose={() => this.CloseEditDialog()}
				>
					<AddCinema
						editCinema={editCinema}
						handleClose={() => this.CloseEditDialog()}
					/>
				</ResponsiveDialog> */}
			</div>
		);
	}
}

CinemaPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	theater: state.theater.theaters,
});

const mapDispatchToProps = { getAllTheater };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(CinemaPanel));
