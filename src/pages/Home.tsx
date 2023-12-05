import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import "../style/App.css";

const Home = () => {
  return (
    <Container>
      <Image src="https://i.ibb.co/zJcdqK7/kanjiguesser.jpg" className="mt-3 img-fluid" />
      <Row className="mt-3">
        <Col>
          <h2>Discover more than 150 Japanese kanji meanings with this web app!</h2>
          <p>
            Learning japanese can be challenging. <br />
            That's why I decided to create this web app to help you :)
          </p>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Link to="/learn">
            <Button variant="primary">Start guessing!</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
