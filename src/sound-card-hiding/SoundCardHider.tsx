import React, { ChangeEvent, useState } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	Checkbox,
	FormControlLabel,
} from '@material-ui/core';
import {
	SoundConfiguration,
	sounds,
} from '../configuration/sound-configuration';
import MenuIcon from '@material-ui/icons/Menu';
import { StorageState } from '../App';

export interface CardHiderProps {
	cardsMap: Map<number, StorageState>;
	onChange: (id: number, isVisible: boolean) => void;
}

export const SoundCardHider = (props: CardHiderProps) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event: any) => {
		setAnchorEl(event.target);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const createListItem = (id: number, title: string) => {
		return (
			<MenuItem key={id}>
				<FormControlLabel
					control={
						<Checkbox
							edge='start'
							color='primary'
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								props.onChange(id, event.target.checked);
							}}
							checked={(props.cardsMap.get(id) as StorageState).isVisible}
						/>
					}
					label={title}
				/>
			</MenuItem>
		);
	};

	return (
		<div>
			<Button onClick={handleClick} color='inherit'>
				<MenuIcon />
				Hide
			</Button>
			<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
				{sounds.map((sound: SoundConfiguration) => {
					return createListItem(sound.id, sound.title);
				})}
			</Menu>
		</div>
	);
};
