# Nature's Whisper

## About

Nature's Whisper is an ambient sound player web application that lets you play around with the sounds of nature. The
 application is written in React.js using Firebase Products for Authentication and for Realtime Database. Nature's Whisper can
  boost your productivity during work or can help relax after a long day.

## Project Setup

After cloning the repository go to the root of the project and run: <br>


```sh
$ npm install
```

(This command will download all the dependencies the project use.
If you do not have npm installed go to: [Download Node.js](https://nodejs.org/en/download/))

To start the application on http://localhost:3000/ run: 

```sh
$ npm start
```

## Usage

The first screen of the application is the default screen where one can play around and try out all the functions without
signing in. The mix of the sounds can be saved so whenever you reopen the application you do not have to configure the sounds
by hand.<br> 
However, if you are using multiple devices it is needed to sign in for reaching the configuration you saved before on one device.

#### Signing In

Clicking on the **Sign In** button at the top right corner of the application, a **Sign in with email** form will appear
 where you can sign in, or register if you have no account yet.<br>
For the moment you can only sign in/register with e-mail.

In case you forget or find trouble signing in, feel free to click on the **Trouble Signing in** option where you can reset your
 password using the link you receive to your email address.

For this function I used FirebaseUI React component which provides React Wrappers on top of the Firebase UI Web library
and Firebase UI Authentication. This component can easily handle the flow of signing in or registering.

#### Configuring the sounds

Each sound card has its own properties (*volume, tone, hide, play*) that you can change without affecting another. For example if
 you do not like a sound you can hide that specific card with the help of the **Hide Cards** menu at the top left corner of
  the application. After clicking on the menu choose the sound you want to hide from the dropdown list. You can change the volume
   individually with the help of the slides as well as tone any sound by pressing on the **Tone** switch.

#### Saving

After you set all the sounds for your liking you can save your mix by pressing the **Save icon** at the top right corner of the
 application. Whenever you sign in to your account this mix will be your default setup to appear.
Without saving, the default configuration will be applied to the application whenever the page refreshes.

For this task I used the Firebase Realtime Database which is a cloud-hosted database. Every user has its own configuration
 which will be loaded as soon as the user logs in.

## Built with

- [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Firebase](https://firebase.google.com/)