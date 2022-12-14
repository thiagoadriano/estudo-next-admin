import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {

    const firebaseConfig = {
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APPID
    };

    firebase.initializeApp(firebaseConfig);
}

export default firebase;