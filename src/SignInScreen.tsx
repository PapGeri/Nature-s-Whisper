import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { myFirebase } from './configuration/firebase-config';

export interface SignInScreenProps{
	isSignedIn: boolean,
	changeSignInHandler: () => void,
}

export interface SignInScreenState{
}

class SignInScreen extends React.Component<SignInScreenProps, SignInScreenState>{

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	};

	componentDidMount() {
		this.props.changeSignInHandler();
	}

	componentWillUnmount() {
		this.props.changeSignInHandler();
	}

	render(){
		return (
			<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={myFirebase.auth()}/>
		)
	}
}

export default SignInScreen;