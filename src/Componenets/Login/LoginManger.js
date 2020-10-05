import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./FirebaseConfig";

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const userLogin = (cv) => {
    return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log(user);
            cv(user)
            return user;
        } else {
            console.log('err');
        }
    });
}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}