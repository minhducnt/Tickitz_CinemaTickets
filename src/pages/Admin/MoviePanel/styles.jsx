const styles = (theme) => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		marginTop: theme.spacing(2),
	},
	progressWrapper: {
		paddingTop: '48px',
		paddingBottom: '24px',
		display: 'flex',
		justifyContent: 'center',
	},
	rowChip: {
		display: 'flex',
		justifyContent: 'left',
		flexWrap: 'wrap',
		listStyle: 'none',
		marginBottom: theme.spacing(2),
	},
	chip: {
		margin: theme.spacing(0.5),
		fontSize: '16px',
		borderRadius: '10px',
	},
	pagination: {
		marginTop: '24px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
});

export default styles;
