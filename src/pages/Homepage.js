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
          <span className="card-subtitle mb-2 text-muted">{item.date}</span>
        </h5>
        <p className="card-text">{item.description}</p>
        <Link to={`/detail/${item.id}`} className="card-link">
          글 보러가기
        </Link>
      </div>
    </div>
  );
}

function Homepage({ userText }) {
  return (
    <ul className="cardList">
      {userText.map((item) => {
        return (
          <li key={item.id}>
            <Card item={item} />
          </li>
        );
      })}
    </ul>
  );
}

export default Homepage;
