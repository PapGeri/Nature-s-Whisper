import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import SoundCardHider from '../sound-card-hiding/SoundCardHider';
import SaveIcon from '@material-ui/icons/Save';
import './HeaderBar.scss';

export interface HeaderBarProps {
	cardsMap: Map<number, boolean>;
	onChange: (id: number, isVisible: boolean) => void;
}

export interface HeaderBarState {

}

class HeaderBar extends React.Component<HeaderBarProps, HeaderBarState> {

	render() {
		return (
			<AppBar position='static' color='transparent'>
				<Toolbar variant='dense'>
					<Typography className='HiderMenu'>
						<SoundCardHider cardsMap={this.props.cardsMap} onChange={this.props.onChange}/>
					</Typography>
					<Button color='inherit'>
						Log In
					</Button>
					<Button color='inherit'>
						Sign Up
					</Button>
					<IconButton color='secondary'>
						<SaveIcon>
							Save
						</SaveIcon>
					</IconButton>
				</Toolbar>
			</AppBar>
		)
	}
}

export default HeaderBar;