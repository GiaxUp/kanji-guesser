import { Container, Row, Col, Image } from "react-bootstrap";
import Comments from "../components/Comments";

const History = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h2>Discover curiosities about kanji and leave feedback about this web app!</h2>
          <p>
            Hi! I wanted to give you some more information about kanji as I find their history very
            fascinating! <b>At the end of the curiosities there is also a comments section</b> where
            you can leave me a message with some feedback or what you would like to see implemented
            in the future in this web app... Or just to leave a generic comment!
          </p>
        </Col>
      </Row>
      <Image src="https://i.ibb.co/D5CM02g/kanji-1.jpg" className="img-fluid" />
      <Row className="my-3">
        <Col>
          <h2>The origin of kanji</h2>
          <p>
            Kanji, as we know it today, has its roots in China, where it's referred to as hànzì.
            These characters found their way to Japan through the Korean peninsula, primarily via
            classical Chinese religious texts. Japan, deeply influenced by China at the time,
            adopted the Chinese writing system for their language. The meanings of the Chinese hànzì
            were directly applied to Japanese. For example, the character 食 represented "meal" or
            "food." Despite adopting Chinese characters, Japanese didn't morph into a
            Chinese-speaking nation. Instead, each kanji was given both a Chinese (on'yomi) and
            Japanese (kun'yomi) reading. On'yomi readings are derived from Chinese pronunciations,
            while kun'yomi readings are the original Japanese ones. The challenge lay in adapting
            Chinese pronunciations to fit the simpler Japanese phonetics, resulting in similarities
            but not exact matches.
          </p>
        </Col>
      </Row>
      <Image src="https://i.ibb.co/xHzBHnf/kanji-2.jpg" className="img-fluid" />
      <Row className="my-3">
        <Col>
          <h2>Approaches to learning kanji readings</h2>
          <p>
            Learning kanji readings can be challenging due to the multitude of correct readings for
            each kanji. Not all readings are equally useful, and memorizing them lacks context. Here
            are some strategies for effective kanji reading learning.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>1. Focus on one reading per kanji</h5>
          <p>
            Contrary to common advice, learning all readings for a kanji can lead to confusion. By
            associating one reading with the meaning, a stronger connection is formed. Trust that,
            in the long run, you'll grasp all important readings. For now, focus on mastering one.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>2. Opt for the most useful kanji reading</h5>
          <p>
            Select the most valuable reading for each kanji, usually the one appearing in 80-90% of
            vocabulary. Allocate your time wisely: not all readings are equally beneficial. By
            prioritizing the most common reading, you maximize your overall kanji comprehension.
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>3. Learn additional readings through vocabulary</h5>
          <p>
            Master other kanji readings by studying vocabulary. This method avoids memory
            interference and ensures that readings are associated with specific words. Learning
            useful vocabulary naturally exposes you to the next most common kanji readings, allowing
            efficient progress in kanji comprehension... <b>Or you can just use this web app :D</b>
          </p>
        </Col>
      </Row>
      <Image src="https://i.ibb.co/mG5rSkD/kangi-3.jpg" className="img-fluid" />
      <Row className="my-3">
        <Col>
          <h2>Next steps to learning kanji</h2>
          <p>
            Understanding when to use these readings is a good starting point, but exceptions abound
            in the fluid and intricate nature of language. For those aiming to master kanji, a
            suggested approach is to initially rely on these rules as a foundation. However, it's
            advisable to verify whether a given word adheres to these rules. For those aspiring to
            become kanji experts, learning both on'yomi and kun'yomi readings alongside vocabulary
            is beneficial. Yet, with over 2,000 kanji in everyday Japanese use, attempting to
            memorize them all at once can be overwhelming for newcomers. To bring order to this
            chaos, exploring spaced repetition learning techniques can be valuable. Additionally,
            creating a structured system to facilitate information retention is crucial. There are
            various methods available, or you can just explore resources like this web app, which
            covers a significant number of kanji and vocabulary for free. Whether constructing a
            personalized study technique or leveraging existing methods, understanding kanji
            readings is challenging but becomes more manageable as one comprehends the function and
            origins of each reading. Don't be discouraged by the multitude of readings. The more you
            learn, the easier it becomes. Have faith in your progress, and good luck on your
            linguistic adventure!
          </p>
        </Col>
      </Row>
      <Comments />
    </Container>
  );
};

export default History;
