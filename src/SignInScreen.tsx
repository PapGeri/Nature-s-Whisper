import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { myFirebase } from './configuration/firebase-config';

export interface SignInScreenProps {
}

export interface SignInScreenState {
}

class SignInScreen extends React.Component<SignInScreenProps, SignInScreenState> {

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		credentialHelper: 'none',
		callbacks: {
			signInSuccessWithAuthResult: () => false
		},
	};

	render() {
		return (
			<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={myFirebase.auth()}/>
		)
	}
}

export default SignInScreen;