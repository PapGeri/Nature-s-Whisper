import React from 'react';
import SoundCard from './sound-card/SoundCard';
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

export interface CardContainerState {}

class SoundCardContainer extends React.Component<
	CardContainerProps,
	CardContainerState
> {
	createCard(
		id: number,
		title: string,
		icon: React.ElementType,
		path: string,
		isSoundOn: boolean,
		hertzNumber: number
	) {
		const currentCard = this.props.cardsMap.get(id) as StorageState;
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
							onPlayButtonChange={this.props.onPlayButtonChange}
							onVolumeChange={this.props.onVolumeChange}
							onToneSwitchChange={this.props.onToneSwitchChange}
						/>
					</Grid>
				</Fade>
			</div>
		);
	}

	render() {
		return (
			<Grid container alignItems='center' justifyContent='center'>
				{sounds.map((sound: SoundConfiguration) => {
					return this.createCard(
						sound.id,
						sound.title,
						sound.icon,
						sound.path,
						this.props.isPlayingMaster,
						sound.hertzNumber
					);
				})}
			</Grid>
		);
	}
}

export default SoundCardContainer;
