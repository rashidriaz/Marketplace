import {initializeApp, FirebaseApp} from "firebase/app";
import {getAuth, Auth} from "firebase/auth";
import {getFirestore, Firestore} from "firebase/firestore";
import {createSingletonHook} from "../utils/createSingletonHook";
import {useEffect} from "react";
import firebase from "firebase/compat";

const useFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDmnNVXXDXRnisxW8FrkLelqK1FP8YUDcw",
    authDomain: "marketplace-app-3e363.firebaseapp.com",
    projectId: "marketplace-app-3e363",
    storageBucket: "marketplace-app-3e363.appspot.com",
    messagingSenderId: "4725745051",
    appId: "1:4725745051:web:04f39593528369dca26d3e",
    measurementId: "G-ZJDKB6Y5S7"
  };
  let app: FirebaseApp = initializeApp(firebaseConfig);
  let auth: Auth = getAuth(app);
  let firestore:Firestore = getFirestore(app);;

  return {app, auth, firestore};
}
const [useFirebaseApp, FirebaseAppProvider] = createSingletonHook(useFirebase);

export {useFirebaseApp, FirebaseAppProvider};
