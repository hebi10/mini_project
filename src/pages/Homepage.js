import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const cardStyle = {
  display: "width: 18rem",
};

function Card({ item }) {
  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title">
          {item.userName}
          <span className="card-subtitle mb-2 text-muted">{`${item.date}`}</span>
        </h5>
        <p className="card-text">{item.description}</p>
        <Link to={`/detail/${item.uid}`} className="card-link">
          글 보러가기
        </Link>
      </div>
    </div>
  );
}

function Homepage({ userText }) {
  const onload = () => {
    window.location.reload(true);
  };

  return (
    <ul className="cardList">
      <li>
        <div className="d-grid gap-2">
          <Button variant="primary" size="lg" onClick={onload}>
            사용자 목록 새로고침
          </Button>
        </div>
      </li>
      {userText.map((item, index) => {
        return (
          <li key={index}>
            <Card item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default Homepage;
