// config 
import firebaseConfig from './config/config'

// Auth
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
    }

    signIn(email, password) {
        return signInWithEmailAndPassword(this.auth, email, password);
    }

    createAccount(name, email, password) {
        return createUserWithEmailAndPassword(this.auth, email, password)
    }

    logout() {
        return signOut(this.auth)
    }
}

const firebase = new Firebase();

export default firebase;