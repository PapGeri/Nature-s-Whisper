import React from 'react';
import { GiFireplace, GiBigWave, GiEgyptianBird, GiWaterfall, GiCricket } from 'react-icons/gi';
import { FiCloudRain, FiWind } from 'react-icons/fi';
import { FaSnowflake } from 'react-icons/fa';

import fireplace from '../assets/sounds/fireplace.wav';
import rain from '../assets/sounds/rain.wav';
import wind from '../assets/sounds/wind.wav';
import waves from '../assets/sounds/ocean-waves.wav';
import cricket from '../assets/sounds/cricket.wav';
import waterfall from '../assets/sounds/waterfall.wav';
import snow from '../assets/sounds/snow.wav';
import bird from '../assets/sounds/bird.wav';

export interface SoundConfiguration {
	id: number;
	title: string;
	icon: React.ElementType;
	path: string;
	hertzNumber: number;
}

export const sounds: SoundConfiguration[] = [
	{
		id: 1, title: 'Fireplace', icon: GiFireplace, path: fireplace, hertzNumber: 300
	},
	{
		id: 2, title: 'Rain', icon: FiCloudRain, path: rain, hertzNumber: 300
	},
	{
		id: 3, title: 'Wind', icon: FiWind, path: wind, hertzNumber: 300
	},
	{
		id: 4, title: 'Waves', icon: GiBigWave, path: waves, hertzNumber: 400
	},
	{
		id: 5, title: 'Cricket', icon: GiCricket, path: cricket, hertzNumber: 300
	},
	{
		id: 6, title: 'Waterfall', icon: GiWaterfall, path: waterfall, hertzNumber: 300
	},
	{
		id: 7, title: 'Snow', icon: FaSnowflake, path: snow, hertzNumber: 300
	},
	{
		id: 8, title: 'Birds', icon: GiEgyptianBird, path: bird, hertzNumber: 300
	},
]