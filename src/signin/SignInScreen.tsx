import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, getAuth } from 'firebase/auth';

export const SignInScreen = () => {
	const uiConfig = {
		signInFlow: 'popup',
		signInOptions: [EmailAuthProvider.PROVIDER_ID],
		credentialHelper: 'none',
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	};

	return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />;
};
