const styles = (theme) => ({
	root: {
		borderBottom: `1px solid ${theme.palette.borderShadow}`,
		boxShadow: `0 0 35px 0  ${theme.palette.borderShadow}`,
		backgroundColor: theme.palette.background.paper,
		display: 'flex',
		alignItems: 'center',
		height: theme.topBar.height,
		zIndex: theme.zIndex.appBar,
	},
	toolbar: {
		margin: 'auto',
		height: theme.topBar.height,
		width: '100%',
		paddingLeft: 0,
		background: theme.palette.background.dark,
	},
	brandWrapper: {
		background: theme.palette.default.dark,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '271px',
		height: theme.topBar.height,
		flexShrink: 0,
	},
	darkBg: {
		background: theme.palette.background.paper,
	},
	logo: {
		width: 'calc(100% - 160px)',
		maxWidth: '100%',
		margin: 'auto',
		fontFamily: 'Montserrat,sans-serif',
		fontSize: '22px',
		fontWeight: 700,
		letterSpacing: 3,
		color: theme.palette.common.white,
	},
	title: {
		marginLeft: theme.spacing(3),
		textTransform: 'uppercase',
		textDecoration: 'none',
		fontSize: '14px',
		color: theme.palette.common.black,
	},
	menuButton: {
		color: theme.palette.common.white,
		marginLeft: '-4px',
	},
	notificationsButton: {
		marginLeft: theme.spacing(4),
	},
});

export default styles;
