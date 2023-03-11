import React from 'react';
import { Button, Dialog, Typography } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Container, Row, Col } from 'react-bootstrap';

const ResponsiveDialog = ({
	id,
	title = '',
	contentText,
	children,
	open,
	handleClose,
	maxWidth = 'lg',
}) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Dialog
			fullScreen={fullScreen}
			fullWidth={true}
			maxWidth={maxWidth}
			open={open}
			onClose={handleClose}
			aria-labelledby={id}
		>
			<Container fluid>
				<Row>
					<Col xs={12} md={8}>
						<DialogTitle id={id}>
							<div>
								<Typography variant="h4" style={{ textTransform: 'uppercase' }}>
									{title}
								</Typography>
							</div>
						</DialogTitle>
					</Col>
					<Col xs={6} md={4}>
						<DialogActions>
							<Button onClick={handleClose} color="primary" autoFocus>
								<CloseIcon />
							</Button>
						</DialogActions>
					</Col>
				</Row>
				<DialogContent>
					<DialogContentText>{contentText}</DialogContentText>
					{children}
				</DialogContent>
			</Container>
		</Dialog>
	);
};

export default ResponsiveDialog;
