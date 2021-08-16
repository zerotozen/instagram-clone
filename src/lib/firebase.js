import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//import { seedDatabase } from "../seed";

const config = {
  apiKey: "AIzaSyAMe3dWDoqocXJce43Kfo1lCKNrZm4wVYY",
  authDomain: "instagram-clone-9d69d.firebaseapp.com",
  projectId: "instagram-clone-9d69d",
  storageBucket: "instagram-clone-9d69d.appspot.com",
  messagingSenderId: "807176931348",
  appId: "1:807176931348:web:bf1ca6748da546b2f0bf01",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//seedDatabase(firebase);

export { firebase, FieldValue };
