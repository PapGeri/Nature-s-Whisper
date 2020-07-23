/*
 * Author : AdNovum Informatik AG
 */
import React from 'react';
import {GiFireplace, FiCloudRain, FiWind, GiBigWave} from 'react-icons/all';

export interface SoundConfiguration {
	id: number;
	title: string;
	icon: React.ElementType;
	secondaryText: string;
	path: string;
	hertzNumber: number;
}

export const sounds: SoundConfiguration[] = [
	{ id: 1, title: 'Fireplace', icon: GiFireplace, secondaryText: 'Its a me a text', path: '/sounds/fireplace.wav', hertzNumber: 300 },
	{
		id: 2,
		title: 'Rainy storm',
		icon: FiCloudRain,
		secondaryText: 'Lorem ipsum dolor sit amet, consectetur adipiscing' +
			' elit. Nulla mollis imperdiet libero eu porta. Ut sit amet blandit odio. In pretium rhoncus ipsum, et rhoncus risus blandit sit amet. Donec aliquet quis lacus id gravida. Praesent faucibus quam velit, ac congue ante aliquet eget. Maecenas dui tellus, malesuada nec sem eu, mollis aliquam lorem. Pellentesque mattis ipsum sed volutpat ornare.',
		path: '/sounds/rain.wav', hertzNumber: 300
	},
	{ id: 3, title: 'Windy Day', icon: FiWind, secondaryText: 'Autumn wind and dry leaves', path: '/sounds/wind.wav', hertzNumber: 300 },
	{id:4, title: 'Waves', icon: GiBigWave, secondaryText: 'Waveeees', path: '/sounds/ocean-waves.wav', hertzNumber: 400},
]