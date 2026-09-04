import React from "react";
import { KanjiItem } from "../../types/kanji";
import { AudioButton } from "../common/AudioButton";

interface StrokeOrderViewerProps {
  kanji: KanjiItem;
}

export const StrokeOrderViewer: React.FC<StrokeOrderViewerProps> = ({ kanji }) => {
  const [videoError, setVideoError] = React.useState(false);

  React.useEffect(() => {
    setVideoError(false);
  }, [kanji.kanji.character]);

  return (
    <div className="glass-panel p-4 text-center">
      <h5 className="fw-bold text-white mb-2">Stroke Animation & Order</h5>
      <p className="small text-secondary mb-3">
        Observe the precise stroke order and balanced proportions
      </p>

      {/* Video Animation Player */}
      {kanji.kanji.video?.mp4 && !videoError ? (
        <div className="kanji-animation-frame mx-auto mb-3">
          <video
            key={kanji.kanji.video.mp4}
            src={kanji.kanji.video.mp4}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoError(true)}
            style={{ width: "180px", height: "180px", objectFit: "contain" }}
          />
        </div>
      ) : (
        <div className="kanji-animation-frame mx-auto mb-3">
          <div
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              width: "180px",
              height: "180px",
              background: "#ffffff",
              borderRadius: "10px",
            }}>
            <span className="kanji-display" style={{ fontSize: "5rem", color: "#0f172a", lineHeight: 1 }}>
              {kanji.kanji.character}
            </span>
            <span className="badge bg-dark text-white-50 mt-2" style={{ fontSize: "0.75rem" }}>
              {kanji.kanji.strokes.count} strokes
            </span>
          </div>
        </div>
      )}

      {/* Stroke step images if available */}
      {kanji.kanji.strokes.images && kanji.kanji.strokes.images.length > 0 && (
        <div className="mt-3">
          <h6 className="small text-muted text-uppercase fw-bold mb-2">
            Stroke Breakdown ({kanji.kanji.strokes.count} total)
          </h6>
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {kanji.kanji.strokes.images.map((imgUrl, idx) => (
              <div
                key={idx}
                className="p-1 rounded bg-dark border border-secondary border-opacity-25"
                style={{ width: "45px", height: "45px" }}
                title={`Stroke ${idx + 1}`}>
                <img
                  src={imgUrl}
                  alt={`Stroke ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "contain", filter: "invert(0.9)" }}
                  onError={(e) => {
                    // Fallback if SVG fails to load
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Audio pronunciation row */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4 pt-3 border-top border-secondary border-opacity-25">
        <AudioButton
          textToSpeak={kanji.kanji.character}
          label="Kanji Audio"
          variant="vermilion"
          size="sm"
        />
        <AudioButton
          textToSpeak={kanji.kunyomi_ja}
          label="Kun'yomi"
          variant="gold"
          size="sm"
        />
        <AudioButton
          textToSpeak={kanji.onyomi_ja}
          label="On'yomi"
          variant="ghost"
          size="sm"
        />
      </div>
    </div>
  );
};
