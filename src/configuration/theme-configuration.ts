import { createMuiTheme } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

export const theme = createMuiTheme({
	palette: {
		primary: green,
	},
	typography: {
		fontFamily: 'Noto Sans JP',
		h1: {
			fontFamily: 'Poppins',
			fontSize: '125px',
		},
		h4: {
			fontFamily: 'Open Sans',
		},
		h6: {
			fontFamily: 'Poppins',
		},
	},
	overrides: {
		MuiCard: {
			root: {
				backgroundColor: '#F2F3F5',
				width: '375px',
				boxShadow: '10px 10px 15px black',
				transition: 'all 0.3s ease-in-out',
				'&&:hover': {
					transform: 'scale(1.1,1.1)',
				},
			},
		},
		MuiIconButton: {
			colorInherit: {
				'& svg': {
					fontSize: '150px',
				},
				transition: 'all 0.4s ease-in-out',
				'&&:hover': {
					transform: 'scale(1.2,1.2)',
				},
			},
		},
	},
});