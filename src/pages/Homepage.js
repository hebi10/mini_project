import { Link } from "react-router-dom";
import styled from "styled-components";

const cardStyle = {
  display: "width: 18rem",
};

const H5 = styled.h5`
  & strong {
    font-size: 1.3rem;
  }

  font-size: 1.1rem;
`;

function Card({ item }) {
  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <H5 className="card-title">
          <strong>{item.userName}</strong>님의 메모장
          <span className="card-subtitle mb-2 text-muted">{`${item.date}`}</span>
        </H5>
        <p className="card-text">{item.description}</p>
        <Link to={`/detail/${item.uid}`} className="card-link">
          글 보러가기
        </Link>
      </div>
    </div>
  );
}

function Homepage({ userText }) {
  console.log(userText);

  return (
    <ul className="cardList">
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
