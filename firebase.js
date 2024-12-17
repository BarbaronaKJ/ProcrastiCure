// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: 'AIzaSyDebsdZXoYSa_W2UAdFJhKrijwJMwvxE78',
  authDomain: 'procasticure-b3f56.firebaseapp.com',
  projectId: 'procasticure-b3f56',
  storageBucket: 'procasticure-b3f56.appspot.com',
  messagingSenderId: '726694359221',
  appId: '1:726694359221:web:a98f60d91bfb919667cefc',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
