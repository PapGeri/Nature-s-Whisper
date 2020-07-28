import React from 'react';
import { GiFireplace, FiCloudRain, FiWind, GiBigWave, GiEgyptianBird, FaSnowflake, GiWaterfall, GiCricket } from 'react-icons/all';

export interface SoundConfiguration {
	id: number;
	title: string;
	icon: React.ElementType;
	path: string;
	hertzNumber: number;
}

export const sounds: SoundConfiguration[] = [
	{
		id: 1, title: 'Fireplace', icon: GiFireplace, path: '/sounds/fireplace.wav', hertzNumber: 300
	},
	{
		id: 2, title: 'Rain', icon: FiCloudRain, path: '/sounds/rain.wav', hertzNumber: 300
	},
	{
		id: 3, title: 'Wind', icon: FiWind, path: '/sounds/wind.wav', hertzNumber: 300
	},
	{
		id: 4, title: 'Waves', icon: GiBigWave, path: '/sounds/ocean-waves.wav', hertzNumber: 400
	},
	{
		id: 5, title: 'Cricket', icon: GiCricket, path: '/sounds/cricket.wav', hertzNumber: 300
	},
	{
		id: 6, title: 'Waterfall', icon: GiWaterfall, path: '/sounds/waterfall.wav', hertzNumber: 300
	},
	{
		id: 7, title: 'Snow', icon: FaSnowflake, path: '/sounds/snow.wav', hertzNumber: 300
	},
	{
		id: 8, title: 'Birds', icon: GiEgyptianBird, path: '/sounds/bird.wav', hertzNumber: 300
	},
]