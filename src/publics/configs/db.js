import Firebase from 'firebase';

let config = {
    apiKey: "AIzaSyDAOE0M5WysGJ5L5693R7O3BbKsavmlg0c",
    authDomain: "hotelbooking-e4531.firebaseapp.com",
    databaseURL: "https://hotelbooking-e4531-default-rtdb.firebaseio.com",
    projectId: "hotelbooking-e4531",
    storageBucket: "hotelbooking-e4531.appspot.com",
    messagingSenderId: "200463127707",
    appId: "1:200463127707:web:3be99842679d900a30223e",
    measurementId: "G-9RQSFFFK7B"
}

let app = Firebase.initializeApp(config);

export const Database = app.database();
export const Auth = app.auth();
