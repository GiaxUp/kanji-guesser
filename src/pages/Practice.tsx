import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useKanji } from "../context/KanjiContext";
import { kanjiService } from "../services/kanjiService";
import { StrokeCanvas } from "../components/kanji/StrokeCanvas";
import { StrokeOrderViewer } from "../components/kanji/StrokeOrderViewer";
import { PenTool, ChevronLeft, ChevronRight } from "lucide-react";
import { audioService } from "../services/audioService";

export const Practice: React.FC = () => {
  const { selectedGrade, setSelectedGrade } = useKanji();
  const [currentIndex, setCurrentIndex] = useState(0);

  const kanjiList = kanjiService.getKanjiList(selectedGrade);
  const currentKanji = kanjiList[currentIndex] || kanjiList[0];

  const handleNext = () => {
    audioService.playClickSound();
    setCurrentIndex((prev) => (prev + 1) % kanjiList.length);
  };

  const handlePrev = () => {
    audioService.playClickSound();
    setCurrentIndex((prev) => (prev - 1 + kanjiList.length) % kanjiList.length);
  };

  return (
    <div className="py-5">
      <Container>
        {/* Page Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "rgba(245, 158, 11, 0.12)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
              <PenTool size={16} color="var(--accent-gold)" />
              <span className="small text-white fw-semibold">Interactive Calligraphy Sandbox</span>
            </div>
            <h2 className="fw-bold text-white mb-1">Stroke Order & Writing Practice</h2>
            <p className="text-secondary small mb-0">
              Develop muscle memory by tracing and writing kanji with precise stroke sequences
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="small text-secondary fw-semibold">Grade:</span>
            <select
              className="form-select bg-dark text-white border-secondary border-opacity-25"
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(parseInt(e.target.value, 10));
                setCurrentIndex(0);
              }}
              style={{ width: "auto", borderRadius: "var(--radius-md)" }}>
              <option value={0}>All Grades</option>
              <option value={1}>Grade 1 (Foundations)</option>
              <option value={2}>Grade 2 (Intermediate)</option>
              <option value={3}>Grade 3</option>
              <option value={4}>Grade 4</option>
              <option value={5}>Grade 5</option>
            </select>
          </div>
        </div>

        {/* Kanji Selector Carousel Strip */}
        <div className="glass-panel p-2 mb-4 overflow-auto">
          <div className="d-flex gap-2 align-items-center justify-content-start px-2 py-1">
            {kanjiList.map((item, idx) => (
              <button
                key={item._id}
                onClick={() => {
                  audioService.playClickSound();
                  setCurrentIndex(idx);
                }}
                className={`btn d-flex flex-column align-items-center justify-content-center p-2 rounded-3 transition-all ${
                  idx === currentIndex
                    ? "btn-danger shadow"
                    : "btn-outline-secondary text-white"
                }`}
                style={{
                  minWidth: "60px",
                  height: "65px",
                  border: idx === currentIndex ? "none" : "1px solid rgba(255,255,255,0.1)",
                }}>
                <span className="kanji-display fs-4 fw-bold">{item.kanji.character}</span>
                <span style={{ fontSize: "0.65rem", opacity: 0.8 }}>
                  {item.kanji.strokes.count} st.
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Practice Grid: Canvas on Left, Stroke Order / Video on Right */}
        {currentKanji && (
          <Row className="gy-4">
            <Col lg={6}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <button onClick={handlePrev} className="btn-secondary-dark btn-sm">
                  <ChevronLeft size={16} /> Prev
                </button>
                <h5 className="fw-bold text-white mb-0">
                  Draw 「<span className="kanji-display text-warning">{currentKanji.kanji.character}</span>」
                </h5>
                <button onClick={handleNext} className="btn-secondary-dark btn-sm">
                  Next <ChevronRight size={16} />
                </button>
              </div>

              <StrokeCanvas kanji={currentKanji} />
            </Col>

            <Col lg={6}>
              <StrokeOrderViewer kanji={currentKanji} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Practice;
