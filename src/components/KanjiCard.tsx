import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Card, Container, Row, Col, Button, Spinner } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";

// Starting kanji informations
// recovered from the first fetch
interface KanjiObject {
  kanji: {
    character: string;
    stroke: number;
  };
  radical: {
    character: string;
  };
}

// Detailed informations recovered
// from the second fetch
interface KanjiAdditionalInfo {
  kanji: {
    character: string;
    strokes: {
      count: number;
      images: string[];
    };
    meaning: {
      english: string;
    };
    video: {
      mp4: string;
    };
    kunyomi: {
      hiragana: string;
    };
    onyomi: {
      katakana: string;
    };
  };
  examples: {
    meaning: {
      english: string;
    };
    japanese: string;
    audio: {
      mp3: string;
    };
  }[];
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
        params: { list: "ap:c3" }, // Can be changed to set another set of kanjis. Ex: { grade: '2' } (1-5)
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_APP_SITE,
        },
      };

      try {
        const response: AxiosResponse<KanjiObject[]> = await axios.request(options);
        setFetchedKanji(response.data); // Array of the 20 objects, with character and radical
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
      console.log(response.data);
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
          style={{ width: "300px", height: "350px" }}
          className="shadow mx-auto"
          onClick={handleFlip}>
          <Card.Header className="h6">
            Try to guess this! {currentKanji.kanji.stroke} strokes
          </Card.Header>
          <Card.Body>
            <Container>
              <Row className="d-flex flex-column justify-content-center align-items-center">
                <Col>
                  <h2 className="display-1 text-center">{currentKanji.kanji.character}</h2>
                  <h4 className="text-center">Radical: {currentKanji.radical.character}</h4>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        {/* Back Card */}
        <Card
          key={currentKanji.kanji.character}
          style={{ width: "300px", height: "350px" }}
          onClick={handleFlip}
          className="mx-auto">
          <Card.Header className="h6">English translation and examples</Card.Header>
          <Card.Body>
            <Row className="d-flex flex-column justify-content-center align-content-center">
              <Col>
                <h4 className="text-center">{additionalInfo?.kanji.meaning.english}</h4>
                {additionalInfo?.examples.slice(0, 3).map((example, index) => (
                  <div key={index}>
                    <p className="text-center">Japanese: {example.japanese}</p>
                    <p className="text-center">English: {example.meaning.english}</p>
                  </div>
                ))}
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
