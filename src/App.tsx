import React from 'react';
import SoundCardContainer from './sound-card-container/SoundCardContainer';
import { theme } from './configuration/theme-configuration';
import { SoundConfiguration, sounds } from './configuration/sound-configuration';
import HeaderBar from './header/HeaderBar';
import { Typography, ThemeProvider, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import './App.scss';

export interface AppProps {
}

export interface AppStates {
	isPlayingMaster: boolean,
	cards: Map<number, boolean>,
}

class App extends React.Component<AppProps, AppStates> {
	constructor(props: AppProps) {
		super(props);
		const cardsMap = this.initCardMap();
		this.state = {
			isPlayingMaster: false,
			cards: cardsMap,
		}
	}

	initCardMap = () => {
		let map = new Map();
		sounds.forEach((sound: SoundConfiguration) => {
			map.set(sound.id, true);
		});
		return map;
	}

	setCardMap = (id: number, isVisible: boolean) => {
		const cardsMap = this.state.cards;
		let newMap = new Map();
		if (cardsMap.has(id)) {
			newMap = cardsMap.set(id, isVisible);
		}
		this.setState({
			cards: newMap,
		});
	}

	handlePlayButton() {
		this.setState({
			isPlayingMaster: !this.state.isPlayingMaster,
		});
	}

	render() {
		const buttonIcon = this.state.isPlayingMaster ? <PauseIcon/> : <PlayArrow/>;
		return (
			<ThemeProvider theme={theme}>
				<div className='App'>
					<HeaderBar
						cardsMap={this.state.cards}
						onChange={this.setCardMap}
					/>
					<header className='Header'>
						<Typography variant='h1' align='center'>
							Nature's Whisper
						</Typography>
						<Typography variant='h4' align='center'>
							Ambient sounds to concentrate and to relax
						</Typography>
						<Typography variant='h2' align='center'>
							<IconButton
								className='MasterPlayButton'
								color='inherit'
								onClick={() => this.handlePlayButton()}>
								{buttonIcon}
							</IconButton>
						</Typography>
					</header>
					<main>
						<div>
							<SoundCardContainer
								cardsMap={this.state.cards}
								isPlayingMaster={this.state.isPlayingMaster}
							/>
						</div>
					</main>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;