import { Container, Nav } from "react-bootstrap";
import { Navbar as Nbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import styled from "styled-components";
import { useState } from "react";

const Span = styled.span`
  float: right;
  color: white;
`;

function Navber() {
  const [userName, setUserName] = useState("게스트");

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserName(user.displayName);
      console.log("name");
    } else {
      document.querySelector(".login").style.display = "none";
    }
  });

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
        <Span>{userName}</Span>
      </Container>
    </Nbar>
  );
}

export default Navber;
