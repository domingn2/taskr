import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBJgXHBB8o4oK6D9F8VZXavNt0NO3YnldA",
  authDomain: "taskr-c1867.firebaseapp.com",
  databaseURL: "https://taskr-c1867.firebaseio.com",
  storageBucket: "taskr-c1867.appspot.com",
}
export const firebaseApp = firebase.initializeApp(firebaseConfig)
