import React, { useEffect, useMemo } from 'react';

import {
	Slider,
	CardContent,
	CardActions,
	Typography,
	Grid,
	Card,
	FormControlLabel,
	Switch,
	IconButton,
} from '@material-ui/core';
import { PlayArrow, VolumeDown, VolumeUp } from '@material-ui/icons';
import PauseIcon from '@material-ui/icons/Pause';
import { SoundHandler } from '../../sound-handler/sound-handler';

export interface SoundCardProps {
	id: number;
	cardName: string;
	soundVolume: number;
	isCardPlayButtonIsOn: boolean;
	isCardToneIsOn: boolean;
	isVisible: boolean;
	cardIcon: React.ElementType;
	cardSoundPath: string;
	isMasterPlayButtonOn: boolean;
	cardHertzValue: number;

	onPlayButtonChange: (id: number, isPlaying: boolean) => void;
	onVolumeChange: (id: number, newValue: number | number[]) => void;
	onToneSwitchChange: (id: number, isToned: boolean) => void;
}

export const SoundCard = (props: SoundCardProps) => {
	const sound: SoundHandler = useMemo(
		() => new SoundHandler(props.cardSoundPath),
		[props.cardSoundPath]
	);

	useEffect(() => {
		if (
			props.isCardPlayButtonIsOn &&
			props.isMasterPlayButtonOn &&
			props.isVisible
		) {
			sound.startSound();
		} else {
			sound.stopSound();
		}

		if (props.isCardToneIsOn) {
			sound.activateTone(props.cardHertzValue);
		} else {
			sound.deactivateTone();
		}
	}, [
		props.cardHertzValue,
		props.isCardPlayButtonIsOn,
		props.isCardToneIsOn,
		props.isMasterPlayButtonOn,
		props.isVisible,
		sound,
	]);

	const handleToneSwitch = (): void => {
		props.onToneSwitchChange(props.id, !props.isCardToneIsOn);
	};

	const handlePlayButtonClick = (): void => {
		props.onPlayButtonChange(props.id, !props.isCardPlayButtonIsOn);
	};

	const handleSliderChange = (
		event: any,
		newValue: number | number[]
	): void => {
		props.onVolumeChange(props.id, newValue);
		sound.setVolume((newValue as number) / 50);
	};

	const individualPlayButton: JSX.Element = props.isCardPlayButtonIsOn ? (
		<PauseIcon />
	) : (
		<PlayArrow />
	);

	const disablePlayButton: boolean = !props.isMasterPlayButtonOn;
	return (
		<Card>
			<CardContent>
				<Grid container spacing={2} alignItems='center' justifyContent='center'>
					<Grid item>
						<Typography variant='h4'>{<props.cardIcon />}</Typography>
					</Grid>
					<Grid item xs>
						<Typography variant='h6'>{props.cardName}</Typography>
					</Grid>
					<Grid item xs>
						<IconButton
							color='primary'
							size='small'
							onClick={handlePlayButtonClick}
							disabled={disablePlayButton}
						>
							{individualPlayButton}
						</IconButton>
					</Grid>
					<Grid item>
						<FormControlLabel
							control={
								<Switch
									checked={props.isCardToneIsOn}
									onChange={handleToneSwitch}
									color='primary'
									size='small'
								/>
							}
							label='Tone'
						/>
					</Grid>
				</Grid>
				<Typography>Volume</Typography>
				<CardActions>
					<Grid
						container
						spacing={2}
						alignItems='center'
						justifyContent='center'
					>
						<Grid item>
							<VolumeDown />
						</Grid>
						<Grid item xs>
							<Slider
								value={props.soundVolume as number}
								onChange={handleSliderChange}
								valueLabelDisplay='auto'
								min={0}
								max={100}
								step={1}
							/>
						</Grid>
						<Grid item>
							<VolumeUp />
						</Grid>
					</Grid>
				</CardActions>
			</CardContent>
		</Card>
	);
};
