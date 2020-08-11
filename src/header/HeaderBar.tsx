import React from 'react';
import { AppBar, Button, IconButton, Snackbar, Toolbar, Typography } from '@material-ui/core';
import SoundCardHider from '../sound-card-hiding/SoundCardHider';
import SaveIcon from '@material-ui/icons/Save';
import './HeaderBar.scss';
import { StorageState } from '../App';
import { Alert, AlertTitle } from '@material-ui/lab';
import { myFirebase } from '../configuration/firebase-config';
import { User } from 'firebase';

export interface HeaderBarProps {
	cardsMap: Map<number, StorageState>,
	onChange: (id: number, isVisible: boolean) => void,
	onSaveButtonPressed: () => void,
	onSignOutButtonPressed: () => void,
	onSignInButtonPressed: () => void,
	open: boolean,
	close: () => void,
}

export interface HeaderBarState {
}

class HeaderBar extends React.Component<HeaderBarProps, HeaderBarState> {

	render() {
		const currentUserAvailable = myFirebase.auth().currentUser;
		return (
			<AppBar position='static' color='transparent'>
				<Toolbar variant='dense'>
					<div className='HiderMenu'>
						<SoundCardHider
							cardsMap={this.props.cardsMap}
							onChange={this.props.onChange}/>
					</div>
					{!!currentUserAvailable ?
						<Typography>
							{(currentUserAvailable as User).displayName}
						</Typography>
						:
						<Button
							onClick={this.props.onSignInButtonPressed}
							color='inherit'
						>
							Sign In
						</Button>
					}

					<Button
						onClick={this.props.onSignOutButtonPressed}
						color='inherit'
					>
						Log Out
					</Button>
					<IconButton
						color='secondary'
						onClick={this.props.onSaveButtonPressed}
					>
						<SaveIcon/>
					</IconButton>
					<Snackbar
						open={this.props.open}
						onClose={this.props.close}
						autoHideDuration={4000}
						anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
						<Alert severity='success'>
							<AlertTitle>
								Saved
							</AlertTitle>
							Successfully saved your adjustments!
						</Alert>
					</Snackbar>
				</Toolbar>
			</AppBar>
		)
	}
}

export default HeaderBar;