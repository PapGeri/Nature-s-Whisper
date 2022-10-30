import React from 'react';
import { SoundCard } from './sound-card/SoundCard';
import {
	SoundConfiguration,
	sounds,
} from '../configuration/sound-configuration';
import { Fade, Grid } from '@material-ui/core';
import './SoundCardContainer.scss';
import { StorageState } from '../App';

export interface CardContainerProps {
	isPlayingMaster: boolean;
	cardsMap: Map<number, StorageState>;
	onPlayButtonChange: (id: number, isPlaying: boolean) => void;
	onVolumeChange: (id: number, newValue: number | number[]) => void;
	onToneSwitchChange: (id: number, isToned: boolean) => void;
}

export const SoundCardContainer = (props: CardContainerProps) => {
	const createCard = (
		soundConfiguration: SoundConfiguration,
		isSoundOn: boolean
	) => {
		const { id, title, icon, path, hertzNumber } = soundConfiguration;
		const currentCard = props.cardsMap.get(id) as StorageState;
		return (
			<div key={id} className='Card'>
				<Fade in={currentCard.isVisible} unmountOnExit={true}>
					<Grid item xs>
						<SoundCard
							id={id}
							cardName={title}
							soundVolume={currentCard.volume}
							isCardPlayButtonIsOn={currentCard.isPlaying}
							isCardToneIsOn={currentCard.isToned}
							isVisible={currentCard.isVisible}
							cardIcon={icon}
							cardSoundPath={path}
							isMasterPlayButtonOn={isSoundOn}
							cardHertzValue={hertzNumber}
							onPlayButtonChange={props.onPlayButtonChange}
							onVolumeChange={props.onVolumeChange}
							onToneSwitchChange={props.onToneSwitchChange}
						/>
					</Grid>
				</Fade>
			</div>
		);
	};

	return (
		<Grid container alignItems='center' justifyContent='center'>
			{sounds.map((sound: SoundConfiguration) => {
				return createCard(sound, props.isPlayingMaster);
			})}
		</Grid>
	);
};
