import React from 'react';
import SoundCard from './sound-card/SoundCard';
import { SoundConfiguration, sounds } from '../configuration/sound-configuration';
import { Fade, Grid } from '@material-ui/core';
import './SoundCardContainer.scss';

export interface CardContainerProps {
	isPlayingMaster: boolean;
	cardsMap: Map<number, boolean>;
}

export interface CardContainerState {
}

class SoundCardContainer extends React.Component<CardContainerProps, CardContainerState> {

	createCard(
		id: number,
		title: string,
		icon: React.ElementType,
		path: string,
		isSoundOn: boolean,
		hertzNumber: number
	) {

		return (
			<div key={id} className='Card'>
				<Fade
					in={this.props.cardsMap.get(id)}
					unmountOnExit={true}
				>
					<Grid item xs>
						<SoundCard
							cardName={title}
							isVisible={this.props.cardsMap.get(id) as boolean}
							cardIcon={icon}
							cardSoundPath={path}
							isMasterPlayButtonOn={isSoundOn}
							cardHertzValue={hertzNumber}
						/>
					</Grid>
				</Fade>
			</div>
		)
	}

	render() {
		return (
			<Grid container alignItems='center' justify='center'>
				{sounds.map((sound: SoundConfiguration) => {
					return this.createCard(
						sound.id,
						sound.title,
						sound.icon,
						sound.path,
						this.props.isPlayingMaster,
						sound.hertzNumber);
				})}
			</Grid>
		);
	}
}

export default SoundCardContainer;