import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  // 보안상 비공개  입니다.
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

db.collection("user")
  .get()
  .then((result) => {
    localStorage.clear();
    result.forEach((doc) => {
      localStorage.setItem(doc.data().userName, JSON.stringify(doc.data()));
    });
  });

export const userData = [];

export async function dataLoad() {
  for (let i = 0; i < localStorage.length; i++) {
    let user = JSON.parse(localStorage.getItem(localStorage.key(i)));
    userData.push(user);
  }
}

export const storage = firebase.storage();
