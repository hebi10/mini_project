import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as Nbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { useState } from "react";
import { useCallback } from "react";

const Span = styled.span`
  float: right;
  color: white;
`;

function Navber() {
  const [userName, setUserName] = useState("게스트");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserName(user.displayName);
    } else {
      document.querySelector(".login").style.display = "none";
    }
  });

  return (
    <Nbar bg="dark" variant="dark">
      <Container>
        <Link to="/">MEMO</Link>
        <Nav className="me-auto">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/upload" className="login">
            Upload
          </Link>
        </Nav>
        <Span>{userName}</Span>
      </Container>
    </Nbar>
  );
}

export default Navber;
