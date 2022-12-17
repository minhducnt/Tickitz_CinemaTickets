// @ts-nocheck
import { createTheme } from '@material-ui/core/styles';
import palette from './palette';
//import paletteDark from './paletteDark';
import typography from './typography';

// read more at https://material-ui.com/customization/themes
const theme = createTheme({
	palette: palette,
	typography,
	zIndex: {
		appBar: 1200,
		drawer: 1100,
	},
	topBar: {
		height: '65px',
	},
});

export default theme;
