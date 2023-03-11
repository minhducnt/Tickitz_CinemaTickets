import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import styles from './styles';

class GenreToolbar extends Component {
	static propTypes = {
		className: PropTypes.string,
		classes: PropTypes.object.isRequired,
	};

	render() {
		const { classes, className, toggleDialog } = this.props;
		const rootClassName = classNames(classes.root, className);

		return (
			<Fragment>
				<div className={rootClassName}>
					<div className={classes.row}>
						<div className={classes.row}>
							<Button
								onClick={() => toggleDialog()}
								className="float-right"
								block
								variant="outline-primary"
							>
								Add Genre
							</Button>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default withStyles(styles)(GenreToolbar);
