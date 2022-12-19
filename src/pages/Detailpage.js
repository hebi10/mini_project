import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../data/userData";
import firebase from "firebase/app";
import CardList from "../components/CardList";
import styled from "styled-components";

const H2 = styled.h2`
  text-align: center;
  margin-top: 20px;
`;

function Detailpage() {
  const [text, setText] = useState([]);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  let navigate = useNavigate();
  let { uid } = useParams();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((data) => {
      if (data) {
        setUser(data);
      }
    });

    db.collection("memo")
      .doc(uid)
      .get()
      .then((result) => {
        setUserName(result.data().userName);
      });
  }, []);

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
      <H2>{userName}님의 마이페이지</H2>
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
