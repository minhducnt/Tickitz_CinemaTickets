import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import useStyles from './styles';

function FooterComponent() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Divider />
			<Typography className={classes.copyright} variant="body1">
				&copy; Nguyễn Thanh Minh Đức & Bùi Công Danh
			</Typography>
			<Typography variant="caption">
				Crafted with love |{' '}
				<Link
					href="https://github.com/congdanh0101/cinema-booking"
					target="_blank"
					rel="noopener"
				>
					Nguyễn Thanh Minh Đức & Bùi Công Danh
				</Link>
			</Typography>
		</div>
	);
}

export default withRouter(FooterComponent);
