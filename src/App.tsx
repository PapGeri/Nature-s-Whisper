import React from 'react';
import SoundCardContainer from './sound-card-container/SoundCardContainer';
import { theme } from './configuration/theme-configuration';
import { SoundConfiguration, sounds } from './configuration/sound-configuration';
import HeaderBar from './header/HeaderBar';
import { Typography, ThemeProvider, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import './App.scss';
import { User } from 'firebase';
import SignInScreen from './SignInScreen';
import { myDatabase, myFirebase } from './configuration/firebase-config';

export interface AppProps {
}

export interface AppStates {
	isPlayingMaster: boolean,
	cards: Map<number, StorageState>,
	snackBarOpen: boolean,
	isLoginInProgress: boolean,
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
			isLoginInProgress: false,
		};
	}

	componentDidMount() {
		myFirebase.auth().onAuthStateChanged((user: User | null) => {
			if (!user) {
				return;
			}
			this.loadCardsFromDatabase(user)
				.then(() => console.log('Database updated'));
		});
	}

	loadCardsFromDatabase = async (user: User | null) => {
		let map = new Map<number, StorageState>();
		const userID: string = (user as User).uid as string;
		const userRef = myDatabase.ref('/users/' + userID + '/cards/');
		const snapshot = await userRef.once('value');

		const data = snapshot.val();
		if (!data) {
			const map = this.initCardMap();
			this.setState({
				isLoginInProgress: false,
				cards: map,
			});
			return;
		}
		data.forEach((config: any) => {
			map.set(config.id as number, {
				volume: config.volume,
				isVisible: config.isVisible,
				isToned: config.isToned,
				isPlaying: config.isPlaying,
			});
		});
		this.setState({
			cards: map,
			isLoginInProgress: false,
		});
	}

	handleSignIn = () => {
		this.setState({
			isLoginInProgress: true,
		});
	}

	handleLogOut = () => {
		myFirebase.auth().signOut().then(() => {
			const map = this.initCardMap();
			this.setState({
				cards: map,
			});
		});
	}

	initCardMap = () => {
		let map = new Map<number, StorageState>();
		if (!myFirebase.auth().currentUser && localStorage.getItem('StorageState') !== null) {
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
		else {
			sounds.forEach((sound: SoundConfiguration) => {
				map.set(sound.id, { volume: 50, isVisible: true, isPlaying: false, isToned: false });
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

	handleDatabaseSave = () => {
		this.setState({
			snackBarOpen: true,
		});
		const currentMap = this.state.cards;

		if (!myFirebase.auth().currentUser) {
			localStorage.setItem('StorageState', JSON.stringify(Array.from(currentMap)));
			return;
		}

		const userID: string = (myFirebase.auth().currentUser as User).uid;
		const databaseRef = myDatabase.ref('/users/' + userID + '/cards/');
		currentMap.forEach((value: StorageState, key: number | string) => {
			let userRef = databaseRef.child(key as string);
			userRef.set({
				id: key as number,
				volume: value.volume as number,
				isPlaying: value.isPlaying,
				isToned: value.isToned,
				isVisible: value.isVisible,
			});
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
		if (!this.state.isLoginInProgress) {
			return (
				<ThemeProvider theme={theme}>
					<div className='App'>
						<HeaderBar
							cardsMap={this.state.cards}
							onChange={this.setCardMap}
							onSaveButtonPressed={this.handleDatabaseSave}
							onSignOutButtonPressed={this.handleLogOut}
							onSignInButtonPressed={this.handleSignIn}
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
				<SignInScreen/>
			</div>
		);
	}
}

export default App;