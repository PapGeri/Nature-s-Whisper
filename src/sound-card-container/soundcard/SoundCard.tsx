/*
 * Author : AdNovum Informatik AG
 */

import React from 'react';

import { Slider, CardContent, CardActions, Typography, Grid, Card, CardHeader, FormControlLabel, Switch, IconButton } from '@material-ui/core'
import { PlayArrow, VolumeDown, VolumeUp } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';

export interface SoundCardProps {
	cardName: string;
	cardIcon: React.ElementType;
	secondaryText: string;
	soundCardPath: string;
	masterPlayIsOn: boolean;
}

export interface SoundCardState {
	soundVolume: number;
	isHidden: boolean;
	isPlaying: boolean;
	isToned: boolean;
}

class SoundCard extends React.Component<SoundCardProps, SoundCardState> {
	constructor(props: SoundCardProps) {
		super(props);
		this.state = {
			soundVolume: 30,
			isHidden: false,
			isPlaying: false,
			isToned: false,
		};
	}

	handleToneClick = () => {
		this.setState({
			isToned: !this.state.isToned,
		});
	}

	handlePlayClick = () => {
		this.setState({
			isPlaying: !this.state.isPlaying,
		});
	}

	handleSliderChange = (event: any, newValue: number | number[]) => {
		this.setState({
			soundVolume: newValue as number,
		});
	}

	render() {
		const individualPlayButton = this.state.isPlaying ? <PauseIcon/> : <PlayArrow/>;
		const disablePlayButton = !this.props.masterPlayIsOn;
		return (
			<Card className="soundCard">
				<CardHeader
					action={
						<FormControlLabel
							control={
								<Switch
									checked={this.state.isToned}
									onChange={this.handleToneClick}
									name="isToneIsOn"
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
					onClick={this.handlePlayClick}
					disabled={disablePlayButton}
				>
					{individualPlayButton}
				</IconButton>
				<CardContent>
					<Typography variant="body1" color="textSecondary">
						{this.props.secondaryText}
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
									value={this.state.soundVolume}
									onChange={this.handleSliderChange}
									valueLabelDisplay="auto"
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