import { Container, Row, Col, Image } from "react-bootstrap";
import Comments from "../components/Comments";
import { historyData } from "../constants/HistoryConst";
import { HistorySection } from "../interfaces/types";
import "../style/App.css";

const History = () => {
  return (
    <Container>
      {historyData.map((section: HistorySection, index: number) => (
        <Row key={index} className="my-3">
          <Col>
            <h2>{section.title}</h2>
            {section.content}
            {section.image && <Image src={section.image} className="img-fluid" />}
          </Col>
        </Row>
      ))}
      <Comments />
    </Container>
  );
};

export default History;
