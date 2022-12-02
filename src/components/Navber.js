import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar as Nbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navber() {
  return (
    <Nbar bg="dark" variant="dark">
      <Container>
        <Link to="/">MEMO</Link>
        <Nav className="me-auto">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="#pricing">Mylist</Link>
          <Link to="/upload">Upload</Link>
        </Nav>
      </Container>
    </Nbar>
  );
}

export default Navber;
