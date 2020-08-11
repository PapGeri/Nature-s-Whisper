import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCKc-AeCe4ebC58g6utbw5BJhQENtYqV7A',
	authDomain: 'nature-s-whisper.firebaseapp.com',
	databaseURL: 'https://nature-s-whisper.firebaseio.com/',
	projectId: 'nature-s-whisper',
	storageBucket: 'nature-s-whisper.appspot.com',
	messagingSenderId: '369584237929',
	appId: '1:369584237929:web:ad05b5bd7bd9ee710ce1f8',
	measurementId: 'G-KYFVFTTMEJ'
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
export const myDatabase = myFirebase.database();