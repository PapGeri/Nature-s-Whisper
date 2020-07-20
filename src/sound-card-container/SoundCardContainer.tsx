/*
 * Author : AdNovum Informatik AG
 */
import React from 'react';
import SoundCard from './soundcard/SoundCard';
import { SoundConfiguration, sounds } from '../configuration/sound-configuration';

export interface CardContainerProps {
	isPlayingMasterButtonOn: boolean;
}

export interface CardContainerState {
}

class SoundCardContainer extends React.Component<CardContainerProps, CardContainerState> {

	createCard(id: number, title: string, icon: React.ElementType, secondaryText: string, path: string, isSoundOn: boolean) {
		return (
			<div className="card" key={id}>
				<SoundCard
					cardName={title}
					cardIcon={icon}
					secondaryText={secondaryText}
					soundCardPath={path}
					masterPlayIsOn={isSoundOn}
				/>
			</div>
		)
	}

	render() {
		return (
			<div>
				{sounds.map((sound : SoundConfiguration) => {
					return this.createCard(sound.id, sound.title, sound.icon, sound.secondaryText, sound.path,
						this.props.isPlayingMasterButtonOn);
				})}
			</div>
		);
	}
}

export default SoundCardContainer;