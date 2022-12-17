const styles = (theme) => ({
	root: {
		color: theme.palette.common.contrastText,
	},
	tableRow: {
		height: '64px',
	},
	tableCell: {
		whiteSpace: 'nowrap',
		fontSize: '14px',
	},
	tableCellHeader: {
		fontSize: '20px',
		whiteSpace: 'nowrap',
	},
	tableCellInner: {
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		display: 'inline-flex',
		fontSize: '14px',
		fontWeight: 500,
		height: '36px',
		width: '36px',
	},
	nameText: {
		whiteSpace: 'nowrap',
		fontSize: '14px',
		fontWeight: 500,
		cursor: 'pointer',
	},
	tableRowHeader: {
		height: '64px',
		backgroundColor: theme.palette.common.neutral,
	},
});

export default styles;
