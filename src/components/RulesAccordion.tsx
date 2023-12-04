import { Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const RulesAccordion = () => {
  return (
    <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
      <Accordion.Item eventKey="0" className="mt-3">
        <Accordion.Header>Rules</Accordion.Header>
        <Accordion.Body>
          Welcome to Kanji Guesser! More than 150 kanji cards will be loaded: you can try to guess
          the english meaning by clicking on the card that will flip and reveal the translations and
          some usage examples. Or you can decide, if you are insecure about something, to save and
          review the kanji later with more detailed informations. <br /> To start a learning
          session, click the green button.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="mt-3">
        <Accordion.Header>Reviews</Accordion.Header>
        <Accordion.Body>
          The review section in the navbar can help you with the learning process: you can find a
          recap of the selected kanji, you can check a short video on how to draw it, check the
          strokes order, know the kunyomi (訓読み - the original, indigenous Japanese readings) and
          onyomi (音読み - readings derived from the Chinese pronunciations) and more. <br />{" "}
          <b>Please note</b> that if you click on the Review section check the saved kanji and then
          come back here on the Learn section <b>a new study session will start</b> removing all
          your temporarily saved kanji. <b>Make sure to study all before you come back here!</b>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default RulesAccordion;
