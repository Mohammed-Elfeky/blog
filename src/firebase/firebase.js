import firebase from 'firebase'
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY}`,
    authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
    projectId: `${process.env.REACT_APP_PROJECTID}`,
    storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
    appId: `${process.env.REACT_APP_APPID}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
};
const firebaseApp=firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
//    export const storage = firebase.storage();