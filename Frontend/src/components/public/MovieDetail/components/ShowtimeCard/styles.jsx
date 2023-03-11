const styles = (theme) => ({
	card: {
		display: 'flex',
		flex: ' 0 0 auto',
		flexDirection: 'column',
		width: 100,
		height: 100,
		boxShadow: `10px 5px 40px 20px ${theme.palette.background.paper}`,
		margin: '60px 30px',
	},
	header: {
		backgroundColor: '#7fc7d9', // Average color of the background image.
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		height: '80%',
		padding: '5px 10px',
		width: '100%',
		color: theme.palette.common.black,
	},
	body: {
		height: '20%',
		color: theme.palette.common.black,
		padding: '15px',
		whiteSpace: 'normal',
	},
});

export default styles;
