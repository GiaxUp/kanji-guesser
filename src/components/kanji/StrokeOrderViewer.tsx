import React from "react";
import { KanjiItem } from "../../types/kanji";
import { AudioButton } from "../common/AudioButton";

interface StrokeOrderViewerProps {
  kanji: KanjiItem;
}

export const StrokeOrderViewer: React.FC<StrokeOrderViewerProps> = ({ kanji }) => {

  return (
    <div className="glass-panel p-4 text-center">
      <h5 className="fw-bold text-white mb-2">Stroke Animation & Order</h5>
      <p className="small text-secondary mb-3">
        Observe the precise stroke order and balanced proportions
      </p>

      {/* Video Animation Player */}
      {kanji.kanji.video?.mp4 ? (
        <div
          className="mx-auto position-relative rounded-3 overflow-hidden shadow mb-3"
          style={{
            maxWidth: "200px",
            aspectRatio: "1/1",
            background: "#162032",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
          <video
            src={kanji.kanji.video.mp4}
            autoPlay
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      ) : (
        <div
          className="mx-auto d-flex align-items-center justify-content-center rounded-3 mb-3"
          style={{
            maxWidth: "180px",
            height: "180px",
            background: "rgba(255,255,255,0.03)",
            border: "1px dashed rgba(255,255,255,0.15)",
          }}>
          <span className="kanji-display text-white" style={{ fontSize: "5rem" }}>
            {kanji.kanji.character}
          </span>
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
