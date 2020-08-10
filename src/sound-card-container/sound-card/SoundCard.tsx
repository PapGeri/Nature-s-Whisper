import React from 'react';

import {
	Slider,
	CardContent,
	CardActions,
	Typography,
	Grid,
	Card,
	FormControlLabel,
	Switch,
	IconButton
} from '@material-ui/core'
import { PlayArrow, VolumeDown, VolumeUp } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import { SoundHandler } from '../../sound-handler';

export interface SoundCardProps {
	id: number,
	cardName: string,
	soundVolume: number,
	isCardPlayButtonIsOn: boolean,
	isCardToneIsOn: boolean,
	isVisible: boolean,
	cardIcon: React.ElementType,
	cardSoundPath: string,
	isMasterPlayButtonOn: boolean,
	cardHertzValue: number,

	onPlayButtonChange: (id: number, isPlaying: boolean) => void,
	onVolumeChange: (id: number, newValue: number | number[]) => void,
	onToneSwitchChange: (id: number, isToned: boolean) => void,
}

export interface SoundCardState {
}

class SoundCard extends React.Component<SoundCardProps, SoundCardState> {
	private sound: SoundHandler = new SoundHandler(this.props.cardSoundPath);

	componentDidUpdate() {
		this.playSound();
		this.playTonedSound();
	}

	handleToneSwitch = () => {
		this.props.onToneSwitchChange(this.props.id, !this.props.isCardToneIsOn);
	}

	handlePlayButtonClick = () => {
		this.props.onPlayButtonChange(this.props.id, !this.props.isCardPlayButtonIsOn);
	}

	handleSliderChange = (event: any, newValue: number | number[]) => {
		this.props.onVolumeChange(this.props.id, newValue);
		this.sound.setVolume(newValue as number / 50);
	}

	playSound = () => {
		if (this.props.isCardPlayButtonIsOn && this.props.isMasterPlayButtonOn && this.props.isVisible) {
			this.sound.startSound();
		}
		else {
			this.sound.stopSound();
		}
	}

	playTonedSound = () => {
		if (this.props.isCardToneIsOn) {
			this.sound.activateTone(this.props.cardHertzValue);
		}
		else {
			this.sound.deactivateTone();
		}
	}

	render() {
		const individualPlayButton = this.props.isCardPlayButtonIsOn ? <PauseIcon/> : <PlayArrow/>;
		const disablePlayButton = !this.props.isMasterPlayButtonOn;
		return (
			<Card>
				<CardContent>
					<Grid container spacing={2} alignItems='center' justify='center'>
						<Grid item>
							<Typography variant='h4'>
								{<this.props.cardIcon/>}
							</Typography>
						</Grid>
						<Grid item xs>
							<Typography variant='h6'>
								{this.props.cardName}
							</Typography>
						</Grid>
						<Grid item xs>
							<IconButton
								color='primary'
								size='small'
								onClick={this.handlePlayButtonClick}
								disabled={disablePlayButton}
							>
								{individualPlayButton}
							</IconButton>
						</Grid>
						<Grid item>
							<FormControlLabel
								control={
									<Switch
										checked={this.props.isCardToneIsOn}
										onChange={this.handleToneSwitch}
										color='primary'
										size='small'
									/>
								}
								label='Tone'
							/>
						</Grid>
					</Grid>
					<Typography>
						Volume
					</Typography>
					<CardActions>
						<Grid container spacing={2} alignItems='center' justify='center'>
							<Grid item>
								<VolumeDown/>
							</Grid>
							<Grid item xs>
								<Slider
									value={this.props.soundVolume as number}
									onChange={this.handleSliderChange}
									valueLabelDisplay='auto'
									min={0}
									max={100}
									step={1}
								/>
							</Grid>
							<Grid item>
								<VolumeUp/>
							</Grid>
						</Grid>
					</CardActions>
				</CardContent>
			</Card>
		);
	}
}

export default SoundCard;