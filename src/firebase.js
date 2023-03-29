import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAQwE-5ru_fFsyjlw9evBKMG5zHUtAwYgM',
//   authDomain: 'clone-f15d8.firebaseapp.com',
//   projectId: 'clone-f15d8',
//   storageBucket: 'clone-f15d8.appspot.com',
//   messagingSenderId: '445547850031',
//   appId: '1:445547850031:web:a9247b02aee08eb5ded9da',
//   measurementId: 'G-Q0T7YC3YZV',
// };
const firebaseConfig = {
  apiKey: 'AIzaSyB-bQ-oLS0AEaolCz61Oxt20Bn4NRKI9UU',
  authDomain: 'youtub-d8d8c.firebaseapp.com',
  projectId: 'youtub-d8d8c',
  storageBucket: 'youtub-d8d8c.appspot.com',
  messagingSenderId: '927126392335',
  appId: '1:927126392335:web:d904125caf938555429d7a',
  measurementId: 'G-1058VVXCR3',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
