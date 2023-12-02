import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";

// Define an interface for the kanji objects
interface KanjiObject {
  kanji: {
    character: string;
    stroke: number;
  };
  radical: {
    character: string;
  };
}

// Add additional informations later
interface KanjiAdditionalInfo {
  meaning: string;
}

const KanjiCard = () => {
  const [fetchedKanji, setFetchedKanji] = useState<KanjiObject[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<KanjiAdditionalInfo | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
        params: { list: "ap:c3" }, // This can be changed to set another set of kanjis -> grade=2 (1-5)
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_APP_SITE,
        },
      };

      try {
        const response: AxiosResponse<KanjiObject[]> = await axios.request(options);
        setFetchedKanji(response.data); //This is the array of the 20 objects
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Run the fetch when the component mounts

  const handleFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped);
  };

  const handleNextKanji = async () => {
    // Move to the next kanji with the button
    setCurrentKanjiIndex((prevIndex) => (prevIndex + 1) % fetchedKanji.length);
    setIsFlipped(false); // Reset flip state when moving to the next kanji

    // Fetch additional data for the new kanji
    const currentCharacter = fetchedKanji[currentKanjiIndex].kanji.character;

    const options = {
      method: "GET",
      url: `https://kanjialive-api.p.rapidapi.com/api/public/kanji/${currentCharacter}`,
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
        "X-RapidAPI-Host": import.meta.env.VITE_APP_SITE,
      },
    };

    try {
      const response = await axios.request(options);
      setAdditionalInfo(response.data); // Set the additional info for the current kanji
    } catch (error) {
      console.error(error);
    }
  };

  if (fetchedKanji.length === 0) {
    return (
      <Container className="mt-5 text-center d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  const currentKanji = fetchedKanji[currentKanjiIndex];

  return (
    <Container className="mt-5 text-center">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front Card */}
        <Card
          key={currentKanji.kanji.character}
          style={{ width: "250px", height: "300px" }}
          className="shadow mx-auto">
          <Card.Header className="h6">Number of strokes: {currentKanji.kanji.stroke}</Card.Header>
          <Card.Body>
            <Container>
              <Row
                className="d-flex flex-column justify-content-center align-items-center"
                onClick={handleFlip}>
                <Col>
                  <h2 className="display-1 text-center">{currentKanji.kanji.character}</h2>
                  <h5 className="text-center">Radical: {currentKanji.radical.character}</h5>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        {/* Back Card */}
        <Card
          key={currentKanji.kanji.character}
          style={{ width: "250px", height: "300px" }}
          onClick={handleFlip}
          className="mx-auto">
          <Card.Header className="h6">Translation</Card.Header>
          <Card.Body>
            <Row className="d-flex flex-column justify-content-center align-content-center">
              <Col>
                <h4 className="text-center">{additionalInfo?.meaning}</h4>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </ReactCardFlip>
      <Button className="mt-3 mx-1" variant="danger">
        What is this?
      </Button>
      <Button onClick={handleNextKanji} className="mt-3 mx-1" variant="success">
        Next card!
      </Button>
    </Container>
  );
};

export default KanjiCard;
