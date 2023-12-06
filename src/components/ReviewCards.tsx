import { Container, Row, Col } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Kanji } from "../interfaces/types";

const ReviewCard = () => {
  // Recovering data from localStorage, went with the
  // non-null assertion operator because I'm sure
  // this can never be null
  const savedInfo: Kanji[] = JSON.parse(localStorage.getItem("savedInfo")!) || [];
  const savedCardCount = savedInfo.length;

  // Display this when there's no saved kanji to review
  if (savedCardCount === 0) {
    return (
      <h4 className="text-center mt-5">
        Seems like there's nothing here, go to the{" "}
        <Link to="/learn" className="text-decoration-none">
          Learn section
        </Link>{" "}
        to save something!
      </h4>
    );
  }

  return (
    <>
      {savedInfo.map((Kanji) => (
        <Container key={Kanji._id} className="big-container my-5">
          <Row>
            <Col xs={1} md={2}></Col>
            <Col>
              <Row>
                <Col xs={12} md={4} lg={4} className="p-1">
                  <div className="small-container h-100 d-flex flex-column align-items-center shadow">
                    <p className="display-1">{Kanji?.kanji.character}</p>
                    <ReactPlayer
                      url={Kanji.kanji.video.mp4}
                      width={"120px"}
                      height={"120px"}
                      playing={true}
                      loop={true}
                    />
                  </div>
                </Col>
                <Col xs={12} md={4} lg={4} className="p-1">
                  <div className="small-container h-100 px-4 shadow">
                    <h5 className="fw-bold">Difficulty level</h5>
                    <p>{Kanji?.grade}/5</p>
                    <h5 className="fw-bold">English meaning</h5>
                    <p>{Kanji?.kanji.meaning.english}</p>
                    <h5 className="fw-bold">Kunyomi</h5>
                    <p>{Kanji?.kunyomi_ja}</p>
                    <h5 className="fw-bold">Onyomi</h5>
                    <p>{Kanji?.onyomi_ja}</p>
                  </div>
                </Col>
                <Col xs={12} md={4} lg={4} className="p-1">
                  <div className="small-container h-100 px-4 shadow">
                    <h5 className="fw-bold">Examples</h5>
                    {Kanji.examples && Kanji.examples.length > 0 ? (
                      Kanji.examples.slice(0, 4).map((example, idx) => (
                        <div key={idx}>
                          <p className="mb-0">{example.japanese}</p>
                          <p>{example.meaning.english}</p>
                        </div>
                      ))
                    ) : (
                      <p>No examples available.</p>
                    )}
                  </div>
                </Col>
              </Row>
              <Row className="d-flex justify-content-around">
                <Col xs={12} md={6} className="p-1">
                  <div className="small-container h-100 px-4 py-3 shadow">
                    <h5 className="fw-bold">Strokes order</h5>
                    {Kanji?.kanji?.strokes?.images ? (
                      Kanji?.kanji?.strokes?.images.map((image, idx) => (
                        <span key={idx}>
                          <img src={image} alt="" style={{ width: "50px" }} />
                        </span>
                      ))
                    ) : (
                      <p>No stroke order available.</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} className="p-1">
                  <div className="small-container h-100 px-4 shadow">
                    <h5 className="fw-bold">Japanese pronuntiation</h5>
                    {Kanji.examples && Kanji.examples.length > 0 && Kanji.examples[0].audio && (
                      <ReactPlayer
                        url={Kanji.examples[0].audio.mp3}
                        width={"250px"}
                        height={"120px"}
                        playing={false}
                        loop={false}
                        controls={true}
                        style={{ paddingBottom: "50px" }}
                      />
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={1} md={2}></Col>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default ReviewCard;
