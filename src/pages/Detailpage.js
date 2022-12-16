import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../data/userData";
import firebase from "firebase/app";
import CardList from "../components/CardList";

function Detailpage() {
  const [text, setText] = useState([]);
  const [user, setUser] = useState();
  let navigate = useNavigate();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  let { uid } = useParams();

  const textPull = () => {
    db.collection("memo")
      .doc(uid)
      .collection("memoText")
      .get()
      .then((result) => {
        let pull = [];
        result.forEach((doc) => {
          pull.push(doc.data());
        });
        setText(pull);
      });
  };

  useEffect(textPull, []);

  return (
    <>
      <ul className="cardFlex">
        {text.map((list, index) => {
          return (
            <li key={index}>
              <CardList list={list} user={user} uid={uid} navigate={navigate} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Detailpage;
