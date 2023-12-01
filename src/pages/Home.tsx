import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../style/App.css";

const Home = () => {
  return (
    <Container>
      <Row className="mt-5">
        <Col>
          <h2>Learn 20 Japanese Kanji with this project!</h2>
          <h6>
            Learning can be challenging, and tackling a language like Japanese adds an extra layer
            of difficulty to the journey!
          </h6>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Link to="/learn">
            <Button variant="primary">Start learning!</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
