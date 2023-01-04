import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../data/userData";
import firebase from "firebase/app";

const cardStyle = {
  display: "width: 18rem",
};

const H5 = styled.h5`
  & strong {
    font-size: 1.3rem;
  }

  font-size: 1.1rem;
`;

function Card({ item, userUid, navigate }) {
  const handleChatroom = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let data = {
          who: [userUid, item.uid],
          user: item.userName,
          userUid: item.uid,
          date: new Date(),
        };

        db.collection("chatroom").doc(item.uid).set(data);

        navigate(`/chatroom/${item.uid}`);
      } else {
        alert("로그인 후 이용 가능합니다.");
      }
    });
  };

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
        <Link onClick={handleChatroom} className="card-link">
          글쓴이와 채팅하기
        </Link>
      </div>
    </div>
  );
}

function Homepage({ userText }) {
  const [userUid, setUserUid] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      }
    });
  }, []);

  return (
    <ul className="cardList">
      {userText.map((item, index) => {
        return (
          <li key={index}>
            <Card item={item} userUid={userUid} navigate={navigate} />
          </li>
        );
      })}
    </ul>
  );
}

export default Homepage;
