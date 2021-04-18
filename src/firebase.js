import firebase from "firebase";

const firebasApp = firebase.initializeApp({
    apiKey: "AIzaSyCg8QbNGZ7XFsE45mXBeONAeKhPgWBnqjM",
    authDomain: "messenger-33de9.firebaseapp.com",
    projectId: "messenger-33de9",
    storageBucket: "messenger-33de9.appspot.com",
    messagingSenderId: "759300119203",
    appId: "1:759300119203:web:4466d7598305294dd13d16"
})

const db = firebasApp.firestore();

export default db;