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
	cards: Map<number, StorageState>,
	snackBarOpen : boolean,
}

export interface StorageState {
	volume: number,
	isVisible: boolean,
	isPlaying: boolean,
	isToned: boolean,
}

class App extends React.Component<AppProps, AppStates> {
	constructor(props: AppProps) {
		super(props);
		const cardsMap = this.initCardMap();
		this.state = {
			isPlayingMaster: false,
			cards: cardsMap,
			snackBarOpen: false,
		}
	}

	initCardMap = () => {
		let map = new Map<number, StorageState>();
		if (localStorage.length === 0) {
			sounds.forEach((sound: SoundConfiguration) => {
				map.set(sound.id, { volume: 50, isVisible: true, isPlaying: false, isToned: false });
			});
		}
		else {
			const value = JSON.parse(localStorage.getItem('1') as string);
			value.forEach((config: any[]) => {
				map.set(config[0] as number, {
					volume: config[1].volume,
					isVisible: config[1].isVisible,
					isPlaying: config[1].isPlaying,
					isToned: config[1].isToned
				});
			});
		}
		return map;
	}

	setCardMap = (id: number, isVisible: boolean) => {
		const cardsMap = this.state.cards;
		let newMap = new Map<number, StorageState>();
		if (cardsMap.has(id)) {
			newMap = cardsMap.set(id, {
				...(cardsMap.get(id) as StorageState),
				isVisible: isVisible
			});
		}
		this.setState({
			cards: newMap,
		});
	}

	handleLocalStorageSave = () => {
		localStorage.setItem('1', JSON.stringify(Array.from(this.state.cards)));
		this.setState({
			snackBarOpen: true,
		});
	}

	handleSnackbarClose = () => {
		this.setState({
			snackBarOpen: false,
		});
	}

	handlePlayButton() {
		this.setState({
			isPlayingMaster: !this.state.isPlayingMaster,
		});
	}

	handleIndividualSoundPlayButtonClick = (id: number, isPlaying: boolean) => {
		const map = this.state.cards;
		let newMap: Map<number, StorageState>;
		newMap = map.set(id, {
			...(map.get(id) as StorageState),
			isPlaying: isPlaying
		});
		this.setState({
			cards: newMap,
		});
	}
	handleIndividualSoundVolume = (id: number, newValue: number | number[]) => {
		const map = this.state.cards;
		let newMap: Map<number, StorageState>;
		newMap = map.set(id, {
			...(map.get(id) as StorageState),
			volume: newValue as number
		});
		this.setState({
			cards: newMap,
		});
	}

	handleIndividualSoundToneSwitch = (id: number, isToned: boolean) => {
		const map = this.state.cards;
		let newMap: Map<number, StorageState>;
		newMap = map.set(id, {
			...(map.get(id) as StorageState),
			isToned: isToned
		});
		this.setState({
			cards: newMap,
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
						onSaveButtonPressed={this.handleLocalStorageSave}
						open={this.state.snackBarOpen}
						close={this.handleSnackbarClose}
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
								onPlayButtonChange={this.handleIndividualSoundPlayButtonClick}
								onVolumeChange={this.handleIndividualSoundVolume}
								onToneSwitchChange={this.handleIndividualSoundToneSwitch}
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