import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDFomIdGaVnPW9xG3Z4nsoyMzIV4ocC0DU',
  authDomain: 'react-firebase-3d191.firebaseapp.com',
  databaseURL: 'https://react-firebase-3d191.firebaseio.com',
  projectId: 'react-firebase-3d191',
  storageBucket: 'react-firebase-3d191.appspot.com',
  messagingSenderId: '755714679190',
  appId: '1:755714679190:web:ff6407d6d4e280e389fdb7',
  measurementId: 'G-WGWL71DKVL',
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  async addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }

    return this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .set({
        quote,
      });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .get();
    return quote.get('quote');
  }
}

export default new Firebase();
