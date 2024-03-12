import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Card, Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import { KanjiObject, KanjiAdditionalInfo } from "../interfaces/types";

const KanjiCards = () => {
  const [fetchedKanji, setFetchedKanji] = useState<KanjiObject[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState<KanjiAdditionalInfo | null>(null);
  const [savedInfo, setSavedInfo] = useState<KanjiAdditionalInfo[]>([]);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState<number>(0);
  const [showReviewLaterAlert, setShowReviewLaterAlert] = useState(false);

  useEffect(() => {
    const savedInfoFromLocalStorage = localStorage.getItem("savedInfo");
    if (savedInfoFromLocalStorage) {
      setSavedInfo(JSON.parse(savedInfoFromLocalStorage));
    }
  }, []); // Load saved info from localStorage when the component mounts

  useEffect(() => {
    localStorage.setItem("savedInfo", JSON.stringify(savedInfo));
  }, [savedInfo]); // Save updated info to localStorage whenever it changes

  // First fetch to get the kanji needed for the second fetch
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://kanjialive-api.p.rapidapi.com/api/public/search/advanced/",
        params: { grade: "2" }, // Can be changed to set another grade of difficulty (1-5)
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_APP_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_APP_SITE,
        },
      };

      try {
        const response: AxiosResponse<KanjiObject[]> = await axios.request(options);
        setFetchedKanji(response.data); // Array of the 160 objects with the needed kanji inside
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
    const nextIndex = (currentKanjiIndex + 1) % fetchedKanji.length;
    setCurrentKanjiIndex(nextIndex);
    setIsFlipped(false); // Reset flip state when moving to the next kanji

    // Fetch additional data for the selected kanji
    const currentCharacter = fetchedKanji[nextIndex].kanji.character;

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
      const newAdditionalInfo: KanjiAdditionalInfo = response.data;
      setAdditionalInfo(newAdditionalInfo);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewLater = () => {
    if (additionalInfo) {
      // Save the current visualized kanji info to the array in state
      setSavedInfo((prevSavedInfo) => [...prevSavedInfo, additionalInfo]);
      setShowReviewLaterAlert(true); // Shows the success alert
      setTimeout(() => {
        setShowReviewLaterAlert(false);
      }, 1000);
    }
  };

  const handleAlertClose = () => {
    setShowReviewLaterAlert(false); // Close the alert
  };

  // Loader
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
      <ReactCardFlip isFlipped={isFlipped && currentKanjiIndex !== 0} flipDirection="vertical">
        {/* Front Card */}
        <Card
          key={currentKanji.kanji.character}
          style={{ width: "300px", height: "350px" }}
          className={`shadow mx-auto card ${currentKanjiIndex === 0 ? "disabled" : ""}`}
          onClick={() => (currentKanjiIndex !== 0 ? handleFlip() : null)}>
          <Card.Header className="h6">
            {currentKanjiIndex === 0 ? "Attention!" : "Try to guess this!"}
          </Card.Header>
          <Card.Body>
            <Container>
              <Row className="d-flex flex-column justify-content-center align-items-center">
                <Col>
                  {currentKanjiIndex === 0 ? (
                    <p className="text-center">Read the rules below before you start guessing!</p>
                  ) : (
                    <>
                      <h1 className="display-1 text-center">{currentKanji.kanji.character}</h1>
                      <p className="text-center mt-4">Radical {currentKanji.radical.character}</p>
                      <p className="text-center mt-4">{currentKanji.kanji.stroke} strokes</p>
                      <p className="text-center mt-4">
                        If you think you know the answer, click the card to reveal the translations.
                      </p>
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        {/* Back Card */}
        <Card
          key={currentKanji.kanji.character}
          style={{ width: "300px", height: "350px" }}
          onClick={() => handleFlip()}
          className="mx-auto">
          <Card.Header className="h6">Translations and examples</Card.Header>
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
      {currentKanjiIndex === 0 ? (
        <Button onClick={handleNextKanji} className="mt-3 mx-1" variant="success">
          I'm ready to start!
        </Button>
      ) : (
        <>
          <Button onClick={handleReviewLater} className="mt-3 mx-1" variant="danger">
            Review this later
          </Button>
          <Button onClick={handleNextKanji} className="mt-3 mx-1" variant="success">
            Next card!
          </Button>
          <Alert
            show={showReviewLaterAlert}
            variant="success"
            onClose={handleAlertClose}
            className="mt-2">
            {`${currentKanji.kanji.character} has been added to the review section!`}
          </Alert>
        </>
      )}
    </Container>
  );
};

export default KanjiCards;
