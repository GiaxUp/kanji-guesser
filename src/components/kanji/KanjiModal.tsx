import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { useKanji } from "../../context/KanjiContext";
import { AudioButton } from "../common/AudioButton";
import { Badge } from "../common/Badge";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";

export const KanjiModal: React.FC = () => {
  const { inspectKanji, setInspectKanji, savedKanji, saveKanjiForReview, removeSavedKanji } = useKanji();

  if (!inspectKanji) return null;

  const isSaved = savedKanji.some(
    (item) => item.kanji.character === inspectKanji.kanji.character
  );

  const handleToggleSave = () => {
    if (isSaved) {
      removeSavedKanji(inspectKanji.kanji.character);
    } else {
      saveKanjiForReview(inspectKanji);
    }
  };

  return (
    <Modal
      show={true}
      onHide={() => setInspectKanji(null)}
      size="lg"
      centered
      className="kanji-detail-modal">
      <Modal.Header closeButton className="border-secondary border-opacity-25 bg-dark">
        <Modal.Title className="d-flex align-items-center gap-2 text-white">
          <span className="kanji-display fs-2" style={{ color: "var(--accent-gold)" }}>
            {inspectKanji.kanji.character}
          </span>
          <span className="fs-5 fw-bold">{inspectKanji.kanji.meaning.english}</span>
          <Badge variant="vermilion">Grade {inspectKanji.grade}</Badge>
          {inspectKanji.jlpt && <Badge variant="gold">{inspectKanji.jlpt}</Badge>}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="bg-dark text-white p-4">
        <Row className="gy-4">
          {/* Left Column: Media & Readings */}
          <Col md={6}>
            <div className="text-center p-3 rounded-3 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              {inspectKanji.kanji.video?.mp4 ? (
                <video
                  src={inspectKanji.kanji.video.mp4}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "160px", height: "160px", objectFit: "contain" }}
                />
              ) : (
                <div className="kanji-display display-1 text-white py-3">
                  {inspectKanji.kanji.character}
                </div>
              )}
              <div className="mt-2 d-flex justify-content-center gap-2">
                <AudioButton
                  textToSpeak={inspectKanji.kanji.character}
                  label="Pronounce"
                  variant="vermilion"
                />
              </div>
            </div>

            {/* Readings */}
            <div className="p-3 rounded-3 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <h6 className="text-uppercase small fw-bold text-secondary mb-2">Readings</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <span className="badge-tag vermilion me-2">訓 Kun'yomi</span>
                  <span className="fw-medium">{inspectKanji.kunyomi_ja}</span>
                </div>
                <AudioButton textToSpeak={inspectKanji.kunyomi_ja} size="sm" variant="vermilion" />
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="badge-tag gold me-2">音 On'yomi</span>
                  <span className="fw-medium">{inspectKanji.onyomi_ja}</span>
                </div>
                <AudioButton textToSpeak={inspectKanji.onyomi_ja} size="sm" variant="gold" />
              </div>
            </div>

            {/* Radical info */}
            {inspectKanji.radical && (
              <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.03)" }}>
                <h6 className="text-uppercase small fw-bold text-secondary mb-1">Radical</h6>
                <div className="d-flex align-items-center gap-2">
                  <span className="kanji-display fs-3 text-warning">
                    {inspectKanji.radical.character || inspectKanji.radical.name.hiragana}
                  </span>
                  <div>
                    <div className="fw-medium">{inspectKanji.radical.name.hiragana}</div>
                    <div className="small text-muted">{inspectKanji.radical.meaning.english}</div>
                  </div>
                </div>
              </div>
            )}
          </Col>

          {/* Right Column: Examples & Stroke Drawing */}
          <Col md={6}>
            <div className="p-3 rounded-3 mb-3" style={{ background: "rgba(255,255,255,0.03)" }}>
              <h6 className="text-uppercase small fw-bold text-secondary mb-2">Vocabulary Examples</h6>
              <div className="d-flex flex-column gap-2">
                {inspectKanji.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-2 rounded d-flex justify-content-between align-items-center"
                    style={{ background: "rgba(0,0,0,0.2)" }}>
                    <div>
                      <div className="fw-bold">{ex.japanese}</div>
                      <div className="small text-muted">{ex.meaning.english}</div>
                    </div>
                    <AudioButton
                      audioUrl={ex.audio?.mp3}
                      textToSpeak={ex.japanese}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                ))}
              </div>
            </div>

            {inspectKanji.mnemonic && (
              <div className="p-3 rounded-3" style={{ background: "rgba(230, 57, 70, 0.08)", border: "1px solid rgba(230,57,70,0.2)" }}>
                <h6 className="text-uppercase small fw-bold text-danger mb-1">Mnemonic Memory Aid</h6>
                <p className="small mb-0 text-secondary">{inspectKanji.mnemonic}</p>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="border-secondary border-opacity-25 bg-dark d-flex justify-content-between">
        <button
          onClick={handleToggleSave}
          className={`btn ${isSaved ? "btn-outline-warning" : "btn-gold-outline"}`}>
          {isSaved ? (
            <>
              <BookmarkCheck size={16} className="me-1" /> Saved in Review Vault
            </>
          ) : (
            <>
              <BookmarkPlus size={16} className="me-1" /> Save for Review
            </>
          )}
        </button>

        <Button variant="secondary" onClick={() => setInspectKanji(null)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
