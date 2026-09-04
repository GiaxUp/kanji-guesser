import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Heart, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer
      className="mt-auto py-5"
      style={{
        background: "rgba(7, 10, 18, 0.95)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        color: "var(--text-secondary)",
      }}>
      <Container>
        <Row className="gy-4 align-items-center">
          <Col md={5}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span style={{ fontFamily: "var(--font-kanji)", fontSize: "1.3rem", color: "var(--accent-vermilion)" }}>
                漢字
              </span>
              <span className="fw-bold text-white fs-5">Kanji Guesser</span>
              <span className="badge-tag vermilion">v2.0</span>
            </div>
            <p className="small mb-0 text-muted" style={{ maxWidth: "380px" }}>
              An interactive Japanese kanji learning app featuring animated stroke orders, 
              native speech pronunciation, spaced review vault, and JLPT quizzes.
            </p>
          </Col>

          <Col md={4} className="d-flex gap-4">
            <div>
              <h6 className="text-white text-uppercase small fw-bold mb-2">Navigation</h6>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
                <li><Link to="/learn" className="text-secondary text-decoration-none hover-text-white">Learn & Guess</Link></li>
                <li><Link to="/practice" className="text-secondary text-decoration-none hover-text-white">Stroke Practice</Link></li>
                <li><Link to="/review" className="text-secondary text-decoration-none hover-text-white">Review Vault</Link></li>
                <li><Link to="/dictionary" className="text-secondary text-decoration-none hover-text-white">Kanji Explorer</Link></li>
              </ul>
            </div>
            <div>
              <h6 className="text-white text-uppercase small fw-bold mb-2">Resources</h6>
              <ul className="list-unstyled small mb-0 d-flex flex-column gap-1">
                <li><Link to="/history" className="text-secondary text-decoration-none hover-text-white">Kanji History</Link></li>
                <li><a href="https://app.kanjialive.com/api/docs" target="_blank" rel="noreferrer" className="text-secondary text-decoration-none hover-text-white">Kanji Alive Docs</a></li>
                <li><Link to="/history#feedback" className="text-secondary text-decoration-none hover-text-white">Leave Feedback</Link></li>
              </ul>
            </div>
          </Col>

          <Col md={3} className="text-md-end">
            <p className="small mb-1 text-secondary d-flex align-items-center justify-content-md-end gap-1">
              Crafted with <Heart size={14} color="var(--accent-vermilion)" fill="var(--accent-vermilion)" /> for Japanese learners
            </p>
            <p className="small text-muted mb-0">
              <Sparkles size={12} className="me-1 text-warning" />
              Tip: Press <kbd className="bg-dark text-white px-1 py-0.5 rounded border border-secondary">Space</kbd> to flip cards!
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
