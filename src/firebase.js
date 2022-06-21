import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA7Byf6NqE7q4qeuRAMq8cPhA3IrG3youQ",
    authDomain: "fb-crud-react-ba779.firebaseapp.com",
    projectId: "fb-crud-react-ba779",
    storageBucket: "fb-crud-react-ba779.appspot.com",
    messagingSenderId: "523807141115",
    appId: "1:523807141115:web:3ba6340a9602ee3ad3545e"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();

