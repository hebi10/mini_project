import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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

export async function userDataLoad() {
  await db.collection("user").onSnapshot((result) => {
    localStorage.clear();
    result.forEach((doc) => {
      localStorage.setItem(doc.data().userName, JSON.stringify(doc.data()));
    });
  });
}

export function dataLoad() {
  let userData = [];

  for (let i = 0; i < localStorage.length; i++) {
    let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
    userData.push(user);
  }
  return userData;
}

export const storage = firebase.storage();
