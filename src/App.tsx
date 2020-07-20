import React from 'react';
import SoundCardContainer from './sound-card-container/SoundCardContainer';
import { Button, Typography } from '@material-ui/core';
import { PlayArrow } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';

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
		const buttonText = this.state.isPlayingMaster ? 'Pause' : 'Play';
		return (
			<div className="App">
				<header className="App-header">
					<Typography variant="h3" align="center">
						Nature's Whisper
						<div className="MasterButtons">
							<Button
								startIcon={buttonIcon}
								onClick={() => this.handlePlayButton()}
							>
								{buttonText}
							</Button>
						</div>
					</Typography>
				</header>
				<main className="App-main">
					<div className="App-CardContainer">
						<SoundCardContainer isPlayingMasterButtonOn={this.state.isPlayingMaster}/>
					</div>
				</main>
			</div>
		);
	}
}

export default App;
