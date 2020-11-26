import * as firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiIjPKty8GMZ48jxq90Yj-CYMHx3MEBKE",
  authDomain: "ecommerce-react-ed5b0.firebaseapp.com",
  databaseURL: "https://ecommerce-react-ed5b0.firebaseio.com",
  projectId: "ecommerce-react-ed5b0",
  storageBucket: "ecommerce-react-ed5b0.appspot.com",
  messagingSenderId: "535717677046",
  appId: "1:535717677046:web:bf963a6353824fe24ea9d7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
