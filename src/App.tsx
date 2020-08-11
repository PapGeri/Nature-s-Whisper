import React from 'react';
import SoundCardContainer from './sound-card-container/SoundCardContainer';
import { theme } from './configuration/theme-configuration';
import { SoundConfiguration, sounds } from './configuration/sound-configuration';
import HeaderBar from './header/HeaderBar';
import { Typography, ThemeProvider, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import './App.scss';
import { myFirebase } from './configuration/firebase-config';
import { User } from 'firebase';
import SignInScreen from './SignInScreen';


export interface AppProps {
}

export interface AppStates {
	isPlayingMaster: boolean,
	cards: Map<number, StorageState>,
	snackBarOpen: boolean,
	userSignedIn: boolean,
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
			userSignedIn: false,
		};
	}

	componentDidMount() {
		myFirebase.auth().onAuthStateChanged((user: User | null) => {
			this.setState({
				//if the object is null its false, if its an object its true
				userSignedIn: !!user,
			});
		})
	}

	handleLogOut = () => {
		myFirebase.auth().signOut();
	}

	initCardMap = () => {
		let map = new Map<number, StorageState>();
		if (localStorage.getItem('StorageState') === null) {
			sounds.forEach((sound: SoundConfiguration) => {
				map.set(sound.id, { volume: 50, isVisible: true, isPlaying: false, isToned: false });
			});
		}
		else {
			const value = JSON.parse(localStorage.getItem('StorageState') as string);
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
		localStorage.setItem('StorageState', JSON.stringify(Array.from(this.state.cards)));
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

	handleUserSignIn = () => {
		myFirebase.auth().onAuthStateChanged((user: User | null) => {
			this.setState({
				userSignedIn: !!user,
			});
		})
	}

	render() {
		const buttonIcon = this.state.isPlayingMaster ? <PauseIcon/> : <PlayArrow/>;
		if (this.state.userSignedIn) {
			return (
				<ThemeProvider theme={theme}>
					<div className='App'>
						<HeaderBar
							cardsMap={this.state.cards}
							onChange={this.setCardMap}
							onSaveButtonPressed={this.handleLocalStorageSave}
							onSignOutButtonPressed={this.handleLogOut}
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
		return (
			<div className='auth-container'>
				<SignInScreen isSignedIn={this.state.userSignedIn} changeSignInHandler={this.handleUserSignIn} />
			</div>
		);
	}
}

export default App;