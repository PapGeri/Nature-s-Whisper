import React from 'react';
import SoundCardContainer from './sound-card-container/SoundCardContainer';
import { Typography, ThemeProvider, IconButton } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import './App.scss';
import { theme } from './configuration/theme-configuration';

export interface AppProps {
}

export interface AppStates {
	isPlayingMaster: boolean,
}

class App extends React.Component<AppProps, AppStates> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			isPlayingMaster: false,
		}
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
					<header className='Header'>
						<Typography variant='h1' align='center'>
							Nature's Whisper
						</Typography>
						<Typography variant='h4' align='center'>
							Ambient sounds to concentrate and to relax
						</Typography>
						<Typography variant='h2' align='center'>
							<IconButton
								color='inherit'
								onClick={() => this.handlePlayButton()}>
								{buttonIcon}
							</IconButton>
						</Typography>
					</header>
					<main>
						<div>
							<SoundCardContainer isPlayingMaster={this.state.isPlayingMaster}/>
						</div>
					</main>
				</div>
			</ThemeProvider>
		);
	}
}

export default App;