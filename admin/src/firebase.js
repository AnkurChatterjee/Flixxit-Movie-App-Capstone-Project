import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBifHvotsbqgwKGUSuQ7SvR1Sf6F4MWbgM",
    authDomain: "flixxit.firebaseapp.com",
    projectId: "flixxit",
    storageBucket: "flixxit.appspot.com",
    messagingSenderId: "153935882433",
    appId: "1:153935882433:web:802230c76419c907828c40",
    measurementId: "G-B67NB7JG81"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;