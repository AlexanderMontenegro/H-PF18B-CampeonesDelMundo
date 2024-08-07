import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey:"AIzaSyAimR4zr9lj4HFrTLQr2kgQS-R4Om8SeHo",
    authDomain: "backcampeones.firebaseapp.com",
    projectId: "backcampeones",
    storageBucket: "backcampeones.appspot.com",
    messagingSenderId: "964351700855",
    appId: "1:964351700855:web:0691fa66f94a10e98ffb72",
    measurementId: "G-3QFS3J3L7E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, facebookProvider, db, githubProvider,signInWithPopup };