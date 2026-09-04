import React, { useState } from "react";
import { KanjiItem } from "../../types/kanji";
import { AudioButton } from "../common/AudioButton";
import { Badge } from "../common/Badge";
import { audioService } from "../../services/audioService";
import { RotateCw, BookmarkPlus, Check, Eye } from "lucide-react";
import { useKanji } from "../../context/KanjiContext";

interface KanjiCardProps {
  kanji: KanjiItem;
  isFlipped: boolean;
  onFlip: () => void;
  onNext: () => void;
  onSaveForReview: () => void;
  isSaved?: boolean;
}

export const KanjiCard: React.FC<KanjiCardProps> = ({
  kanji,
  isFlipped,
  onFlip,
  onNext,
  onSaveForReview,
  isSaved = false,
}) => {
  const { incrementStreak, setInspectKanji } = useKanji();
  const [markedMastered, setMarkedMastered] = useState(false);

  const handleCardClick = () => {
    audioService.playCardFlipSound();
    onFlip();
  };

  const handleGotItRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playSuccessSound();
    incrementStreak();
    setMarkedMastered(true);
    setTimeout(() => {
      setMarkedMastered(false);
      onNext();
    }, 600);
  };

  return (
    <div className="card-flip-container" onClick={handleCardClick}>
      <div className={`card-flip-inner ${isFlipped ? "is-flipped" : ""}`}>
        {/* --- FRONT OF CARD --- */}
        <div className="card-face card-front">
          {/* Top Bar: Badges & Audio */}
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="d-flex gap-2">
              <Badge variant="vermilion">Grade {kanji.grade}</Badge>
              {kanji.jlpt && <Badge variant="gold">{kanji.jlpt}</Badge>}
            </div>

            <AudioButton
              textToSpeak={kanji.kanji.character}
              size="sm"
              variant="gold"
              label="Listen"
            />
          </div>

          {/* Central Kanji Glyphs */}
          <div className="my-auto py-3">
            <h1
              className="kanji-display text-white mb-2"
              style={{
                fontSize: "6.5rem",
                textShadow: "0 0 35px rgba(230, 57, 70, 0.4)",
                transition: "transform 0.3s ease",
              }}>
              {kanji.kanji.character}
            </h1>

            {/* Radical & Strokes details */}
            <div className="d-flex justify-content-center gap-2 mt-2">
              {kanji.radical && (
                <span className="badge-tag jade">
                  Radical: {kanji.radical.character || kanji.radical.name.hiragana} ({kanji.radical.meaning.english})
                </span>
              )}
              <span className="badge-tag default">
                {kanji.kanji.strokes.count} strokes
              </span>
            </div>
          </div>

          {/* Bottom Flip Indicator */}
          <div className="pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
            <span className="small text-secondary d-flex align-items-center gap-1">
              <RotateCw size={14} className="text-warning" /> Click to reveal meaning
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setInspectKanji(kanji);
              }}
              className="btn btn-sm text-secondary d-flex align-items-center gap-1 p-0 hover-text-white"
              title="Inspect stroke order & details">
              <Eye size={16} /> Details
            </button>
          </div>
        </div>

        {/* --- BACK OF CARD --- */}
        <div className="card-face card-back text-start">
          {/* Top Bar */}
          <div className="d-flex justify-content-between align-items-center w-100 mb-2">
            <div className="d-flex align-items-center gap-2">
              <span className="kanji-display text-warning fs-3 fw-bold">
                {kanji.kanji.character}
              </span>
              <span className="badge-tag gold">Translation</span>
            </div>
            <span className="small text-secondary d-flex align-items-center gap-1">
              <RotateCw size={13} /> Click to flip
            </span>
          </div>

          {/* Meaning */}
          <div className="mb-3">
            <h3 className="fw-bold text-white mb-1" style={{ fontSize: "1.45rem", color: "#f8fafc" }}>
              {kanji.kanji.meaning.english}
            </h3>
            {kanji.mnemonic && (
              <p className="small text-muted fst-italic mb-0">
                "{kanji.mnemonic}"
              </p>
            )}
          </div>

          {/* Readings */}
          <div className="p-2 rounded mb-3" style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div>
                <span className="badge-tag vermilion me-2">訓 Kun'yomi</span>
                <span className="text-white fw-medium">{kanji.kunyomi_ja}</span>
              </div>
              <AudioButton textToSpeak={kanji.kunyomi_ja} size="sm" variant="vermilion" />
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="badge-tag gold me-2">音 On'yomi</span>
                <span className="text-white fw-medium">{kanji.onyomi_ja}</span>
              </div>
              <AudioButton textToSpeak={kanji.onyomi_ja} size="sm" variant="gold" />
            </div>
          </div>

          {/* Examples */}
          <div className="flex-grow-1 overflow-auto pe-1" style={{ maxHeight: "150px" }}>
            <h6 className="small text-uppercase fw-bold text-secondary mb-1">Examples:</h6>
            {kanji.examples.slice(0, 3).map((ex, idx) => (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center py-1 border-bottom border-secondary border-opacity-10">
                <div>
                  <div className="text-white small fw-semibold">{ex.japanese}</div>
                  <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                    {ex.meaning.english}
                  </div>
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

          {/* Action Footer */}
          <div className="pt-2 mt-2 border-top border-secondary border-opacity-25 d-flex gap-2">
            <button
              onClick={handleGotItRight}
              className={`btn btn-sm flex-fill d-flex align-items-center justify-content-center gap-1 ${
                markedMastered ? "btn-success" : "btn-outline-success"
              }`}
              style={{ borderRadius: "var(--radius-md)" }}>
              <Check size={16} /> {markedMastered ? "Mastered! +1 🔥" : "I knew this!"}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveForReview();
              }}
              disabled={isSaved}
              className={`btn btn-sm d-flex align-items-center gap-1 ${
                isSaved ? "btn-secondary opacity-75" : "btn-outline-warning"
              }`}
              style={{ borderRadius: "var(--radius-md)" }}>
              <BookmarkPlus size={16} /> {isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
