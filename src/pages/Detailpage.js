import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db, userData } from "../data/userData";
import firebase from "firebase/app";

const Btn = styled(Button)`
  margin-right: 5px;
`;

function CardList({ list, user }) {
  const handleDelete = () => {
    db.collection("memo")
      .doc(user.uid)
      .collection("memoText")
      .doc(list.title)
      .delete();
  };

  // console.log(list);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`${list.imgURL}`} />
      <Card.Body>
        <Card.Title>{list.title}</Card.Title>
        <Card.Text>{list.text}</Card.Text>
        <Button variant="primary" onClick={handleDelete}>
          삭제
        </Button>
      </Card.Body>
    </Card>
  );
}

function Detailpage() {
  const [text, setText] = useState([]);
  const [user, setUser] = useState();

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

  console.log(text);

  return (
    <ul className="cardFlex">
      {text.map((list, index) => {
        return (
          <li key={index}>
            <CardList list={list} user={user} />
          </li>
        );
      })}
    </ul>
  );
}

export default Detailpage;
