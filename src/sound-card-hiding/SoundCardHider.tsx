import React, { ChangeEvent } from 'react';
import { Button, Menu, MenuItem, Checkbox, FormControlLabel } from '@material-ui/core';
import { SoundConfiguration, sounds } from '../configuration/sound-configuration';
import MenuIcon from '@material-ui/icons/Menu';
import { StorageState } from '../App';

export interface CardHiderProps {
	cardsMap: Map<number, StorageState>,
	onChange: (id: number, isVisible: boolean) => void,
}

export interface CardHiderState {
	anchorEl: null | HTMLElement,
}

class SoundCardHider extends React.Component<CardHiderProps, CardHiderState> {
	constructor(props: CardHiderProps) {
		super(props);
		this.state = {
			anchorEl: null,
		};
	}

	handleClick = (event: any) => {
		this.setState({
			anchorEl: event.target,
		});
	}

	handleClose = () => {
		this.setState({
			anchorEl: null,
		});
	}

	createListItem(id: number, title: string) {
		return (
			<MenuItem key={id}>
				<FormControlLabel
					control={
						<Checkbox
							edge='start'
							color='primary'
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								this.props.onChange(id, event.target.checked);
							}}
							checked={(this.props.cardsMap.get(id) as StorageState).isVisible}
						/>
					}
					label={title}
				/>
			</MenuItem>
		);
	}

	render() {
		return (
			<div>
				<Button
					onClick={this.handleClick}
					color='inherit'
				>
					<MenuIcon/>Hide Cards
				</Button>
				<Menu
					anchorEl={this.state.anchorEl}
					open={Boolean(this.state.anchorEl)}
					onClose={this.handleClose}
				>
					{sounds.map((sound: SoundConfiguration) => {
						return this.createListItem(sound.id, sound.title);
					})}
				</Menu>
			</div>
		);
	}
}

export default SoundCardHider;