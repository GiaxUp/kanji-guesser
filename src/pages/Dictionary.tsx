import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { kanjiService } from "../services/kanjiService";
import { KanjiItem } from "../types/kanji";
import { useKanji } from "../context/KanjiContext";
import { Search, BookmarkPlus, BookmarkCheck, Sparkles } from "lucide-react";
import { AudioButton } from "../components/common/AudioButton";
import { audioService } from "../services/audioService";

export const Dictionary: React.FC = () => {
  const { setInspectKanji, savedKanji, saveKanjiForReview, removeSavedKanji } = useKanji();
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState(0);
  const [visibleLimit, setVisibleLimit] = useState(96);

  const results = kanjiService.searchKanji(searchQuery, gradeFilter);

  // Reset pagination when search query or grade changes
  React.useEffect(() => {
    setVisibleLimit(96);
  }, [searchQuery, gradeFilter]);

  const displayedResults = results.slice(0, visibleLimit);

  const isItemSaved = (character: string) => {
    return savedKanji.some((k) => k.kanji.character === character);
  };

  const handleToggleSave = (e: React.MouseEvent, item: KanjiItem) => {
    e.stopPropagation();
    if (isItemSaved(item.kanji.character)) {
      audioService.playClickSound();
      removeSavedKanji(item.kanji.character);
    } else {
      audioService.playSuccessSound();
      saveKanjiForReview(item);
    }
  };

  return (
    <div className="py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "rgba(236, 72, 153, 0.12)", border: "1px solid rgba(236, 72, 153, 0.3)" }}>
            <Sparkles size={16} color="var(--accent-sakura)" />
            <span className="small text-white fw-semibold">Kanji Explorer & Dictionary</span>
          </div>
          <h2 className="fw-bold text-white mb-2">Browse the Kanji Catalog</h2>
          <p className="text-white small mx-auto" style={{ maxWidth: "580px" }}>
            Explore complete Joyo & Jinmeiyo Japanese characters (3,000 kanji) by English meaning, Romaji, reading, or stroke count.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-4 position-relative" style={{ maxWidth: "500px" }}>
            <Search
              size={20}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
            />
            <input
              type="text"
              className="form-control form-control-lg ps-5 bg-dark text-white border-secondary border-opacity-25 shadow"
              placeholder="Search e.g. sun, water, mizu, 日..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: "var(--radius-full)" }}
            />
          </div>

          {/* Grade Pill Filters */}
          <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
            {[
              { label: "All (3,000)", grade: 0 },
              { label: "Grade 1 (80)", grade: 1 },
              { label: "Grade 2 (160)", grade: 2 },
              { label: "Grade 3 (200)", grade: 3 },
              { label: "Grade 4 (200)", grade: 4 },
              { label: "Grade 5 (185)", grade: 5 },
              { label: "Grade 6+ & Names (2,174)", grade: 6 },
            ].map((p) => (
              <button
                key={p.grade}
                onClick={() => {
                  audioService.playClickSound();
                  setGradeFilter(p.grade);
                }}
                className={`btn btn-sm rounded-pill px-3 ${
                  gradeFilter === p.grade
                    ? "btn-danger fw-bold shadow"
                    : "btn-secondary-dark text-white"
                }`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="d-flex justify-content-between align-items-center mb-3 text-white small">
          <span>Found <strong>{results.length}</strong> characters (showing {displayedResults.length})</span>
          <span className="fw-medium">Click any card to inspect strokes and examples</span>
        </div>

        {/* Kanji Cards Grid */}
        <Row className="g-3">
          {displayedResults.map((item) => {
            const saved = isItemSaved(item.kanji.character);

            return (
              <Col key={item._id} xs={6} sm={4} md={3} lg={2}>
                <div
                  onClick={() => {
                    audioService.playClickSound();
                    setInspectKanji(item);
                  }}
                  className="glass-panel p-3 text-center h-100 d-flex flex-column justify-content-between position-relative cursor-pointer transition-all"
                  style={{
                    cursor: "pointer",
                    border: saved ? "1px solid rgba(245, 158, 11, 0.4)" : undefined,
                  }}
                  title="Click to view stroke video and examples">
                  {/* Top Badges */}
                  <div className="d-flex justify-content-between align-items-center w-100 mb-1">
                    <span className="badge-tag vermilion" style={{ fontSize: "0.65rem", padding: "0.1rem 0.4rem" }}>
                      G{item.grade}
                    </span>
                    <button
                      onClick={(e) => handleToggleSave(e, item)}
                      className="btn btn-sm p-0 text-white hover-text-white"
                      title={saved ? "Saved in Vault" : "Save for review"}>
                      {saved ? (
                        <BookmarkCheck size={16} color="var(--accent-gold)" />
                      ) : (
                        <BookmarkPlus size={16} />
                      )}
                    </button>
                  </div>

                  {/* Character */}
                  <div className="my-2">
                    <span
                      className="kanji-display d-block text-white"
                      style={{ fontSize: "3rem", lineHeight: 1 }}>
                      {item.kanji.character}
                    </span>
                  </div>

                  {/* Meaning & Strokes */}
                  <div>
                    <div className="fw-bold text-white small text-truncate" title={item.kanji.meaning.english}>
                      {item.kanji.meaning.english}
                    </div>
                    <div className="text-white fw-medium" style={{ fontSize: "0.78rem" }}>
                      {item.kanji.strokes.count} strokes
                    </div>
                  </div>

                  {/* Audio button */}
                  <div className="mt-2 pt-2 border-top border-secondary border-opacity-10 d-flex justify-content-center">
                    <AudioButton
                      textToSpeak={item.kanji.character}
                      size="sm"
                      variant="ghost"
                    />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Load More Button */}
        {results.length > visibleLimit && (
          <div className="text-center mt-5">
            <button
              onClick={() => setVisibleLimit((prev) => prev + 96)}
              className="btn btn-primary-gradient px-5 py-2 rounded-pill shadow">
              Load More Characters ({displayedResults.length} / {results.length})
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Dictionary;
