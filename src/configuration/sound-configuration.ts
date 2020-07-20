/*
 * Author : AdNovum Informatik AG
 */
import React from 'react';
import FireplaceIcon from '@material-ui/icons/Fireplace';

export interface SoundConfiguration {
	id: number;
	title: string;
	icon: React.ElementType;
	secondaryText: string;
	path: string;
}

export const sounds: SoundConfiguration[] = [
	{ id: 1, title: 'Fireplace', icon: FireplaceIcon, secondaryText: 'Its a me a text', path: 'wave.wav' },
	{
		id: 2,
		title: 'Rain',
		icon: FireplaceIcon,
		secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing' +
			' elit. Nulla mollis imperdiet libero eu porta. Ut sit amet blandit odio. In pretium rhoncus ipsum, et rhoncus risus blandit sit amet. Donec aliquet quis lacus id gravida. Praesent faucibus quam velit, ac congue ante aliquet eget. Maecenas dui tellus, malesuada nec sem eu, mollis aliquam lorem. Pellentesque mattis ipsum sed volutpat ornare.',
		path: 'rain.mp3'
	},
	{ id: 3, title: 'Windy Day', icon: FireplaceIcon, secondaryText: 'Its a me a text', path: 'wind.mp3' },
]