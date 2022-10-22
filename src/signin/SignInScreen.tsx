import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, getAuth } from 'firebase/auth';

export interface SignInScreenProps {}

export interface SignInScreenState {}

class SignInScreen extends React.Component<
	SignInScreenProps,
	SignInScreenState
> {
	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [EmailAuthProvider.PROVIDER_ID],
		credentialHelper: 'none',
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	};

	render() {
		return (
			<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={getAuth()} />
		);
	}
}

export default SignInScreen;
