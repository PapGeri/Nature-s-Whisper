import React, { useCallback, useEffect, useState } from 'react';
import { SoundCardContainer } from './sound-card-container/SoundCardContainer';
import { theme } from './configuration/theme-configuration';
import {
	SoundConfiguration,
	sounds,
} from './configuration/sound-configuration';
import HeaderBar from './header/HeaderBar';
import { Typography, ThemeProvider, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import './App.scss';
import { User } from 'firebase/auth';
import { SignInScreen } from './signin/SignInScreen';
import { myDatabase } from './configuration/firebase-config';
import { ref, onValue, set, DataSnapshot } from 'firebase/database';
import { getAuth, signOut } from 'firebase/auth';

export interface AppStates {
	isPlayingMaster: boolean;
	cards: Map<number, StorageState>;
	snackBarOpen: boolean;
	isLoginInProgress: boolean;
}

export interface StorageState {
	volume: number;
	isVisible: boolean;
	isPlaying: boolean;
	isToned: boolean;
}

export const App = () => {
	const initCardMap = () => {
		let map = new Map<number, StorageState>();
		if (
			!getAuth().currentUser &&
			localStorage.getItem('StorageState') !== null
		) {
			const value = JSON.parse(localStorage.getItem('StorageState') as string);
			value.forEach((config: any[]) => {
				map.set(config[0] as number, {
					volume: config[1].volume,
					isVisible: config[1].isVisible,
					isPlaying: config[1].isPlaying,
					isToned: config[1].isToned,
				});
			});
		} else {
			sounds.forEach((sound: SoundConfiguration) => {
				map.set(sound.id, {
					volume: 50,
					isVisible: true,
					isPlaying: false,
					isToned: false,
				});
			});
		}
		return map;
	};

	const [isPlayingMaster, setIsPlayingMaster] = useState(false);
	const [cards, setCards] = useState(initCardMap());
	const [snackBarOpen, setSnackBarOpen] = useState(false);
	const [isLoginInProgress, setIsLoginInProgress] = useState(false);

	useEffect(() => {
		console.log('useEffect');
		getAuth().onAuthStateChanged((user: User | null) => {
			console.log('user', user);
			if (!user) {
				setCards(initCardMap);
				return;
			}

			let map = new Map<number, StorageState>();
			const userID: string = (user as User).uid as string;
			const userRef = ref(myDatabase, '/users/' + userID + '/cards/');
			let data: any;
			onValue(userRef, (snapshot: DataSnapshot) => {
				data = snapshot.val();
			});

			if (!data) {
				const map = initCardMap();
				setIsLoginInProgress(false);
				setCards(map);
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

			setCards(map);
			setIsLoginInProgress(false);
		});
	}, []);

	const handleSignIn = () => {
		setIsLoginInProgress(true);
	};

	const handleLogOut = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
			setCards(initCardMap);
		});
	};

	const setCardMap = (id: number, isVisible: boolean) => {
		setCards(
			new Map(
				cards.set(id, {
					...(cards.get(id) as StorageState),
					isVisible: isVisible,
				})
			)
		);
	};

	const handleDatabaseSave = () => {
		setSnackBarOpen(true);
		const currentMap = cards;

		if (!getAuth().currentUser) {
			localStorage.setItem(
				'StorageState',
				JSON.stringify(Array.from(currentMap))
			);
			return;
		}

		const userID: string = (getAuth().currentUser as User).uid;
		currentMap.forEach((value: StorageState, key: number | string) => {
			set(ref(myDatabase, '/users/' + userID + '/cards/'), {
				id: key as number,
				volume: value.volume as number,
				isPlaying: value.isPlaying,
				isToned: value.isToned,
				isVisible: value.isVisible,
			});
		});
	};

	const handleSnackbarClose = () => {
		setSnackBarOpen(false);
	};

	const handlePlayButton = () => {
		setIsPlayingMaster(!isPlayingMaster);
	};

	const handleIndividualSoundPlayButtonClick = (
		id: number,
		isPlaying: boolean
	) => {
		setCards(
			new Map(
				cards.set(id, {
					...(cards.get(id) as StorageState),
					isPlaying: isPlaying,
				})
			)
		);
	};

	const handleIndividualSoundVolume = (
		id: number,
		newValue: number | number[]
	) => {
		setCards(
			new Map(
				cards.set(id, {
					...(cards.get(id) as StorageState),
					volume: newValue as number,
				})
			)
		);
	};

	const handleIndividualSoundToneSwitch = (id: number, isToned: boolean) => {
		setCards(
			new Map(
				cards.set(id, {
					...(cards.get(id) as StorageState),
					isToned: isToned,
				})
			)
		);
	};

	const buttonIcon = isPlayingMaster ? <PauseIcon /> : <PlayArrow />;
	if (!isLoginInProgress) {
		return (
			<ThemeProvider theme={theme}>
				<div className='App'>
					<HeaderBar
						cardsMap={cards}
						onChange={setCardMap}
						onSaveButtonPressed={handleDatabaseSave}
						onSignOutButtonPressed={handleLogOut}
						onSignInButtonPressed={handleSignIn}
						open={snackBarOpen}
						close={handleSnackbarClose}
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
								onClick={handlePlayButton}
							>
								{buttonIcon}
							</IconButton>
						</Typography>
					</header>
					<main>
						<div>
							<SoundCardContainer
								cardsMap={cards}
								onPlayButtonChange={handleIndividualSoundPlayButtonClick}
								onVolumeChange={handleIndividualSoundVolume}
								onToneSwitchChange={handleIndividualSoundToneSwitch}
								isPlayingMaster={isPlayingMaster}
							/>
						</div>
					</main>
				</div>
			</ThemeProvider>
		);
	} else {
		return (
			<div className='auth-container'>
				<SignInScreen />
			</div>
		);
	}
};
