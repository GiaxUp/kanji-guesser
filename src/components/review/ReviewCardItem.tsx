import React from "react";
import { ReviewItem } from "../../types/kanji";
import { AudioButton } from "../common/AudioButton";
import { Badge } from "../common/Badge";
import { Trash2, Check, Eye } from "lucide-react";
import { useKanji } from "../../context/KanjiContext";

interface ReviewCardItemProps {
  item: ReviewItem;
}

export const ReviewCardItem: React.FC<ReviewCardItemProps> = ({ item }) => {
  const { toggleMastered, removeSavedKanji, setInspectKanji } = useKanji();

  return (
    <div
      className={`glass-panel p-4 mb-4 transition-all ${
        item.mastered ? "border-success border-opacity-50" : ""
      }`}>
      <div className="row gy-4 align-items-center">
        {/* Kanji Glyph & Video Animation */}
        <div className="col-12 col-md-3 text-center">
          <div
            className="p-3 rounded-3 d-flex flex-column align-items-center justify-content-center"
            style={{
              background: item.mastered
                ? "rgba(16, 185, 129, 0.08)"
                : "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
            <h1
              className="kanji-display text-white mb-2"
              style={{
                fontSize: "4.5rem",
                color: item.mastered ? "#6ee7b7" : "#fff",
              }}>
              {item.kanji.character}
            </h1>

            {item.kanji.video?.mp4 ? (
              <video
                src={item.kanji.video.mp4}
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "90px", height: "90px", objectFit: "contain" }}
              />
            ) : (
              <div className="small text-white fw-semibold mb-2">
                {item.kanji.strokes.count} strokes
              </div>
            )}

            <div className="mt-2 d-flex gap-1">
              <AudioButton
                textToSpeak={item.kanji.character}
                label="Kanji Audio"
                size="sm"
                variant="vermilion"
              />
            </div>
          </div>
        </div>

        {/* Meaning & Readings */}
        <div className="col-12 col-md-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h4 className="fw-bold text-white mb-0">{item.kanji.meaning.english}</h4>
            <Badge variant="vermilion">Grade {item.grade}</Badge>
            {item.mastered && <Badge variant="jade">Mastered</Badge>}
          </div>

          <div className="d-flex flex-column gap-2 mb-3">
            <div className="d-flex justify-content-between align-items-center p-2 rounded bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div>
                <span className="small text-white fw-bold d-block">Kun'yomi (訓読み)</span>
                <span className="text-white fw-bold">{item.kunyomi_ja}</span>
              </div>
              <AudioButton textToSpeak={item.kunyomi_ja} size="sm" variant="gold" />
            </div>

            <div className="d-flex justify-content-between align-items-center p-2 rounded bg-dark bg-opacity-75 border border-secondary border-opacity-25">
              <div>
                <span className="small text-white fw-bold d-block">On'yomi (音読み)</span>
                <span className="text-white fw-bold">{item.onyomi_ja}</span>
              </div>
              <AudioButton textToSpeak={item.onyomi_ja} size="sm" variant="vermilion" />
            </div>
          </div>

          {item.radical && (
            <div className="small text-white">
              Radical: <strong className="text-warning">{item.radical.character || item.radical.name.hiragana}</strong> (
              <span className="text-white fw-medium">{item.radical.meaning.english}</span>)
            </div>
          )}
        </div>

        {/* Examples */}
        <div className="col-12 col-md-5">
          <h6 className="small text-uppercase fw-bold text-white mb-2">
            Usage Examples & Audio
          </h6>
          <div className="d-flex flex-column gap-2">
            {item.examples.slice(0, 3).map((ex, idx) => (
              <div
                key={idx}
                className="p-2 rounded bg-dark bg-opacity-75 border border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                <div>
                  <div className="text-white fw-bold small">{ex.japanese}</div>
                  <div className="text-white fw-medium" style={{ fontSize: "0.85rem" }}>
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

          {/* Action Row */}
          <div className="d-flex justify-content-end gap-2 mt-3 pt-2 border-top border-secondary border-opacity-25">
            <button
              onClick={() => setInspectKanji(item)}
              className="btn-secondary-dark btn-sm"
              title="View stroke breakdown">
              <Eye size={15} /> Stroke Guide
            </button>

            <button
              onClick={() => toggleMastered(item._id)}
              className={`btn btn-sm d-flex align-items-center gap-1 ${
                item.mastered ? "btn-success" : "btn-outline-success"
              }`}
              style={{ borderRadius: "var(--radius-md)" }}>
              <Check size={15} /> {item.mastered ? "Mastered" : "Mark Mastered"}
            </button>

            <button
              onClick={() => removeSavedKanji(item._id)}
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              style={{ borderRadius: "var(--radius-md)" }}
              title="Remove from review vault">
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
