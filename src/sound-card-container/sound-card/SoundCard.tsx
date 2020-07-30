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
	cardName: string;
	isVisible: boolean;
	cardIcon: React.ElementType;
	cardSoundPath: string;
	isMasterPlayButtonOn: boolean;
	cardHertzValue: number;
}

export interface SoundCardState {
	cardSoundVolume: number;
	isCardPlayButtonIsOn: boolean;
	isCardToneIsOn: boolean;
}

class SoundCard extends React.Component<SoundCardProps, SoundCardState> {
	private sound: SoundHandler = new SoundHandler(this.props.cardSoundPath);

	constructor(props: SoundCardProps) {
		super(props);
		this.state = {
			cardSoundVolume: 50,
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
		//The gainNode volume goes from 0 to 2, but my Slider values are from 0 to 100.
		// This way the scaling and the value is good as well.
		this.sound.setVolume(newValue as number / 50);
	}

	playSound = () => {
		if (this.state.isCardPlayButtonIsOn && this.props.isMasterPlayButtonOn && this.props.isVisible) {
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
										checked={this.state.isCardToneIsOn}
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
									value={this.state.cardSoundVolume as number}
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