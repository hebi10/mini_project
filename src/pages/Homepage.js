import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../data/userData";
import firebase from "firebase/app";
import { Button } from "react-bootstrap";
import useLoginInfo from "../customHook/useLoginInfo";

const cardStyle = {
  display: "width: 18rem",
};

const Btn = styled(Button)`
  max-width: 800px;
  width: 90%;
  margin: 20px auto 0;
`;

const H5 = styled.h5`
  & strong {
    font-size: 1.3rem;
  }

  font-size: 1.1rem;
`;

function Card({ item, userUid, navigate, login }) {
  const handleChatroom = () => {
    if (login) {
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
        <br />
        <Link onClick={handleChatroom} className="card-link">
          {item.userName}님 오픈채팅방
        </Link>
      </div>
    </div>
  );
}

function Homepage({ userText }) {
  const [userUid, userName, login] = useLoginInfo();
  let navigate = useNavigate();

  return (
    <>
      <div className="d-grid gap-2">
        <Btn
          variant="primary"
          size="lg"
          onClick={() => {
            window.location.reload(true);
          }}
        >
          최신글 불러오기
        </Btn>
      </div>
      <ul className="cardList">
        {userText.map((item, index) => {
          return (
            <li key={index}>
              <Card
                item={item}
                userUid={userUid}
                navigate={navigate}
                login={login}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Homepage;
