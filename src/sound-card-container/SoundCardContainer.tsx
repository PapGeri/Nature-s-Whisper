/*
 * Author : AdNovum Informatik AG
 */
import React from 'react';
import SoundCard from './soundcard/SoundCard';
import { SoundConfiguration, sounds } from '../configuration/sound-configuration';

export interface CardContainerProps {
	isPlayingMaster: boolean;
}

export interface CardContainerState {
}

class SoundCardContainer extends React.Component<CardContainerProps, CardContainerState> {

	createCard(id: number, title: string, icon: React.ElementType, secondaryText: string, path: string, isSoundOn: boolean, hertzNumber: number) {
		return (
			<div className="card" key={id}>
				<SoundCard
					cardName={title}
					cardIcon={icon}
					cardSecondaryText={secondaryText}
					cardSoundPath={path}
					isMasterPlayButtonOn={isSoundOn}
					cardHertzValue={hertzNumber}
				/>
			</div>
		)
	}

	render() {
		return (
			<div>
				{sounds.map((sound : SoundConfiguration) => {
					return this.createCard(sound.id, sound.title, sound.icon, sound.secondaryText, sound.path,
						this.props.isPlayingMaster, sound.hertzNumber);
				})}
			</div>
		);
	}
}

export default SoundCardContainer;