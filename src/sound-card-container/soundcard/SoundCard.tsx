/*
 * Author : AdNovum Informatik AG
 */

import React from 'react';

import {
	Slider,
	CardContent,
	CardActions,
	Typography,
	Grid,
	Card,
	CardHeader,
	FormControlLabel,
	Switch,
	IconButton
} from '@material-ui/core'
import { PlayArrow, VolumeDown, VolumeUp } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import { SoundHandler } from './sound-handler';

export interface SoundCardProps {
	cardName: string;
	cardIcon: React.ElementType;
	cardSecondaryText: string;
	cardSoundPath: string;
	isMasterPlayButtonOn: boolean;
	cardHertzValue: number;
}

export interface SoundCardState {
	cardSoundVolume: number;
	isHidden: boolean;
	isCardPlayButtonIsOn: boolean;
	isCardToneIsOn: boolean;
}

class SoundCard extends React.Component<SoundCardProps, SoundCardState> {
	private sound: SoundHandler = new SoundHandler(this.props.cardSoundPath);

	constructor(props: SoundCardProps) {
		super(props);
		this.state = {
			cardSoundVolume: 50,
			isHidden: false,
			isCardPlayButtonIsOn: false,
			isCardToneIsOn: false,
		};
	}

	componentDidUpdate() {
		this.playSound();
		this.playTonedSound();
	}

	handleToneSwitch = () => {
		this.setState({
			isCardToneIsOn: !this.state.isCardToneIsOn,
		});
	}

	handlePlayButtonClick = () => {
		this.setState({
			isCardPlayButtonIsOn: !this.state.isCardPlayButtonIsOn,
		});
	}

	handleSliderChange = (event: any, newValue: number | number[]) => {
		this.setState({
			cardSoundVolume: newValue as number,
		});
		//The gainNode volume goes from 0 to 2, but my Slider's values are from 0 to 100.
		// This way the scaling and the value is good as well.
		this.sound.setVolume(newValue as number / 50);
	}

	playSound = () => {
		if (this.state.isCardPlayButtonIsOn && this.props.isMasterPlayButtonOn) {
			this.sound.startSound();
		}
		else {
			this.sound.stopSound();
		}
	}

	playTonedSound = () => {
		if (this.state.isCardToneIsOn) {
			this.sound.activateTone(this.props.cardHertzValue);
		}
		else {
			this.sound.deactivateTone();
		}
	}

	render() {
		const individualPlayButton = this.state.isCardPlayButtonIsOn ? <PauseIcon/> : <PlayArrow/>;
		const disablePlayButton = !this.props.isMasterPlayButtonOn;
		return (
			<Card className="soundCard">
				<CardHeader
					action={
						<FormControlLabel
							control={
								<Switch
									checked={this.state.isCardToneIsOn}
									onChange={this.handleToneSwitch}
									color="primary"
								/>
							}
							label="Tone"
						/>
					}
					title={this.props.cardName}
					avatar={<this.props.cardIcon/>}
				/>
				<IconButton
					color='primary'
					onClick={this.handlePlayButtonClick}
					disabled={disablePlayButton}
				>
					{individualPlayButton}
				</IconButton>
				<CardContent>
					<Typography variant="body1" color="textSecondary">
						{this.props.cardSecondaryText}
					</Typography>
					<Typography id="continuous-slider">
						Volume
					</Typography>
					<CardActions>
						<Grid container spacing={2}>
							<Grid item>
								<VolumeDown/>
							</Grid>
							<Grid item xs>
								<Slider
									value={this.state.cardSoundVolume as number}
									onChange={this.handleSliderChange}
									valueLabelDisplay="auto"
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