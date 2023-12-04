import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function TopNavbar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Kanji Guesser</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="learn">Learn</Nav.Link>
          <Nav.Link href="review">Review</Nav.Link>
          <Nav.Link href="history">History</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
