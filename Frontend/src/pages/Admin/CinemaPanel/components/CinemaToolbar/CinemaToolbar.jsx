import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
// import { Button } from 'react-bootstrap';
import {
	SearchInput,
	ResponsiveDialog,
} from '../../../../../components/common';
import styles from './styles';
import AddCinema from '../AddCinema/AddCinema';

class CinemaToolbar extends Component {
	state = {
		openAddDialog: false,
	};

	OpenAddDialog() {
		this.setState({ openAddDialog: true });
	}

	CloseAddDialog() {
		this.setState({ openAddDialog: false });
	}

	render() {
		const { openAddDialog } = this.state;
		const { classes, className, search, onChangeSearch } = this.props;

		const rootClassName = classNames(classes.root, className);

		return (
			<Fragment>
				<div className={rootClassName}>
					<div className={classes.row}>
						<SearchInput
							className={classes.searchInput}
							placeholder="Search cinema"
							value={search}
							onChange={onChangeSearch}
						/>
						{/* <Button
							onClick={() => this.OpenAddDialog()}
							className="float-right col-12 col-md-2"
							variant="outline-primary"
							block
							size="small"
						>
							Add Theater
						</Button> */}
					</div>
				</div>
				<ResponsiveDialog
					id="Add-cinema"
					open={openAddDialog}
					handleClose={() => this.CloseAddDialog()}
				>
					<AddCinema />
				</ResponsiveDialog>
			</Fragment>
		);
	}
}

CinemaToolbar.propTypes = {
	className: PropTypes.string,
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CinemaToolbar);
