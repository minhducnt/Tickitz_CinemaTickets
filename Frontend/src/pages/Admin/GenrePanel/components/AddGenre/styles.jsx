const styles = (theme) => ({
	root: {},
	title: {
		textTransform: 'uppercase',
		textAlign: 'center',
	},
	field: {
		paddingTop: theme.spacing(2),
		display: 'flex',
	},
	textField: {
		width: '100%',
		paddingTop: theme.spacing(2),
	},
	textFieldSelect: {
		textTransform: 'capitalize',
		width: '100%',
		height: '55px',
		marginRight: theme.spacing(3),
		borderRadius: '10px',
	},
	portletFooter: {
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	buttonFooter: {
		margin: theme.spacing(3),
	},
	infoMessage: {
		marginLeft: theme.spacing(3),
	},
});

export default styles;
