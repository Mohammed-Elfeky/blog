import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDSREoSYs0XBjnuRf430GBcC3cxjXiF4tI",
    authDomain: "blog-e8a1f.firebaseapp.com",
    projectId: "blog-e8a1f",
    storageBucket: "blog-e8a1f.appspot.com",
    messagingSenderId: "436572857871",
    appId: "1:436572857871:web:d53926543d07e0dd26257a",
    measurementId: "G-EK3F89T1YQ"
};
const firebaseApp=firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
//    export const storage = firebase.storage();