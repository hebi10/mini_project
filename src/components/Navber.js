import { Container, Nav } from "react-bootstrap";
import { Navbar as Nbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { useState } from "react";

const Span = styled.span`
  float: right;
  color: white;

  position: relative;

  & h5 {
    font-size: 16px;
    cursor: pointer;
  }

  & ul {
    opacity: 0;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    transition-duration: 0.3s;
    pointer-events: none;
  }

  &:hover ul {
    opacity: 1;
    padding-top: 15px;
    pointer-events: auto;
  }

  & ul li {
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    padding: 5px 10px;
    width: 100px;
    cursor: pointer;
  }
`;

function Navber() {
  const [userName, setUserName] = useState("게스트");
  const [userUid, setUserUid] = useState(null);
  let navigate = useNavigate();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      setUserName(user.displayName);
      setUserUid(user.uid);
    } else {
      document.querySelector(".login").style.display = "none";
    }
  });

  const logOut = () => {
    firebase.auth().signOut();
    alert("로그아웃이 완료되었습니다.");
    window.location.reload(true);
  };

  return (
    <Nbar bg="dark" variant="dark">
      <Container>
        <Link to="/">
          <h4>MEMO</h4>
        </Link>
        <Nav className="me-auto">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/upload" className="login">
            Upload
          </Link>
        </Nav>
        <Span>
          <h5>{userName}</h5>
          <ul>
            <li
              onClick={() => {
                navigate(`/mypage/${userUid}`);
              }}
            >
              내 정보
            </li>
            <li onClick={logOut}>로그아웃</li>
          </ul>
        </Span>
      </Container>
    </Nbar>
  );
}

export default Navber;
