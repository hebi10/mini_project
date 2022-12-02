import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1YL185M8lRdJuKAmWogX1TsO073Tily4",
  authDomain: "with-react-a047a.firebaseapp.com",
  projectId: "with-react-a047a",
  storageBucket: "with-react-a047a.appspot.com",
  messagingSenderId: "342844357085",
  appId: "1:342844357085:web:cad66f8621e6ae1a711e34",
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
// const storage = firebase.storage();

db.collection("user")
  .get()
  .then((result) => {
    localStorage.clear();
    result.forEach((doc) => {
      localStorage.setItem("user" + doc.data().id, JSON.stringify(doc.data()));
    });
  });

export const userData = [];

for (let i = 0; i < localStorage.length; i++) {
  let user = JSON.parse(localStorage.getItem("user" + i));
  userData.push(user);
}
