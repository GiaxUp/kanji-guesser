import React from "react";
import { Container, Image } from "react-bootstrap";
import { HISTORY_DATA } from "../data/historyData";
import { FeedbackBoard } from "../components/comments/FeedbackBoard";
import { ScrollText, CheckCircle, Sparkles } from "lucide-react";

export const History: React.FC = () => {
  return (
    <div className="py-5">
      <Container style={{ maxWidth: "860px" }}>
        {/* Page Title */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "rgba(99, 102, 241, 0.12)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
            <ScrollText size={16} color="var(--accent-indigo)" />
            <span className="small text-white fw-semibold">Chronicles & Study Philosophy</span>
          </div>
          <h1 className="display-5 fw-bold text-white mb-2">The History & Secrets of Kanji</h1>
          <p className="text-secondary lead mx-auto" style={{ maxWidth: "620px" }}>
            Unraveling how ancient Chinese oracle bone characters evolved into modern Japanese calligraphy, and how to master them effectively.
          </p>
        </div>

        {/* History Articles Timeline */}
        <div className="d-flex flex-column gap-5">
          {HISTORY_DATA.map((section, idx) => (
            <article key={section.id} className="glass-panel p-4 p-md-5">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge-tag gold">{section.era}</span>
                <span className="small text-muted">Part {idx + 1} of {HISTORY_DATA.length}</span>
              </div>

              <h2 className="fw-bold text-white mb-2" style={{ fontSize: "1.75rem" }}>
                {section.title}
              </h2>

              {section.tagline && (
                <p className="text-warning small fst-italic mb-4">
                  — {section.tagline}
                </p>
              )}

              {/* Section Image if present */}
              {section.image && (
                <div className="my-4 text-center">
                  <Image
                    src={section.image}
                    alt={section.title}
                    className="img-fluid rounded-3 shadow"
                    style={{ maxHeight: "380px", objectFit: "cover", width: "100%" }}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="text-secondary" style={{ fontSize: "1.05rem", lineHeight: 1.8 }}>
                {section.content.split("\n\n").map((para, pIdx) => (
                  <p key={pIdx} className="mb-3">
                    {para}
                  </p>
                ))}
              </div>

              {/* Bullet Key Takeaways */}
              {section.bullets && section.bullets.length > 0 && (
                <div className="p-3 rounded-3 mt-4" style={{ background: "rgba(255, 255, 255, 0.03)", borderLeft: "3px solid var(--accent-vermilion)" }}>
                  <h6 className="text-uppercase small fw-bold text-white mb-2 d-flex align-items-center gap-1">
                    <Sparkles size={14} color="var(--accent-vermilion)" /> Key Takeaways
                  </h6>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="small text-secondary d-flex align-items-start gap-2">
                        <CheckCircle size={15} color="var(--accent-jade)" className="mt-1 flex-shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Feedback Section at the bottom (Preserving original feedback section) */}
        <FeedbackBoard />
      </Container>
    </div>
  );
};

export default History;
