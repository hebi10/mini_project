import { Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../data/userData";

function CardList({ list }) {
  return (
    <Card style={{ width: "18rem" }}>
      {list.img || (
        <Card.Img variant="top" src="https://via.placeholder.com/300" />
      )}
      <Card.Body>
        <Card.Title>{list.title}</Card.Title>
        <Card.Text>{list.text}</Card.Text>
        <Button variant="primary">상세페이지</Button>
      </Card.Body>
    </Card>
  );
}

function Detailpage({ userText }) {
  let { id } = useParams();
  let userID = userText.find((x) => {
    return x.id == id;
  });

  return (
    <ul className="cardFlex">
      {userID.memo.map((list, index) => {
        return (
          <li key={index}>
            <CardList list={list} />
          </li>
        );
      })}
    </ul>
  );
}

export default Detailpage;
