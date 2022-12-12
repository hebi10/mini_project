import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../data/userData";
import firebase from "firebase/app";

function CardList({ list, user }) {
  const handleDelete = () => {
    try {
      db.collection("memo")
        .doc(user.uid)
        .collection("memoText")
        .doc(list.title)
        .delete()
        .then(() => {
          alert("삭제하였습니다.");
          window.location.reload(true);
        });
    } catch (err) {
      console.error(err);
      alert("게시글은 작성자와 관리자만 삭제 가능합니다.");
    }
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
