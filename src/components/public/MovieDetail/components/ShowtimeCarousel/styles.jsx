const styles = (theme) => ({
	container: {
		display: 'flex',
		alignItems: 'baseline',
	},
	h2: {
		fontSize: '2rem',
		color: theme.palette.common.black,
		margin: theme.spacing(3),
		textTransform: 'capitalize',
	},
	button: {},
	carousel: {
		width: '55%',
		height: '100%',
		margin: 'auto',
	},
	arrow: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 60,
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		background: 'rgba(0,0,0,.5)',
		color: theme.palette.common.black,
		zIndex: 1,
		'&.prevArrow': {
			left: 0,
			justifyContent: 'flex-start',
			backgroundColor: 'transparent',
			opacity: ({ currentSlide }) => (currentSlide ? 1 : 0),
		},
		'&.nextArrow': {
			right: 0,
			justifyContent: 'flex-end',
			backgroundColor: 'transparent',
			opacity: ({ currentSlide, slideCount }) =>
				currentSlide === slideCount ? 0 : 1,
		},
	},

	slider: { '& .slick-slide': { padding: theme.spacing(1) } },
});

export default styles;
