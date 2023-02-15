import firebase from 'firebase/compat/app'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyAXCDG0wEh918jdJTeMLmVsm2qqE15rMr0",
  authDomain: "otp-verify-f2755.firebaseapp.com",
  projectId: "otp-verify-f2755",
  storageBucket: "otp-verify-f2755.appspot.com",
  messagingSenderId: "346228126267",
  appId: "1:346228126267:web:02675442e82eb69014621e",
  measurementId: "G-702LQ7VQ8G"
};
  firebase.initializeApp(firebaseConfig);
  
export default firebase