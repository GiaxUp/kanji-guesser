import { Container, Row, Col } from "react-bootstrap";
import ReviewCards from "../components/ReviewCards";
import "../style/App.css";

const Review = () => {
  return (
    <div>
      <Container>
        <Row className="mt-3">
          <Col>
            <h2>Study and review your saved kanji here!</h2>
            <p>
              In this section, you can find a detailed box with all the information about the kanji
              you saved in the Learn section. <br /> <b>BE CAREFUL!</b> If you leave this section
              now and click on Learn again, a new game session will start and all the saved kanji
              here will be cleared!
              <br />
              <b>
                Make sure to study everything before you start a new round of the guessing game!
              </b>
            </p>
          </Col>
        </Row>
      </Container>
      <ReviewCards />
    </div>
  );
};

export default Review;
