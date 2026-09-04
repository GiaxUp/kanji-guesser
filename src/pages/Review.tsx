import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useKanji } from "../context/KanjiContext";
import { ReviewCardItem } from "../components/review/ReviewCardItem";
import { ReviewFilterBar } from "../components/review/ReviewFilterBar";
import { BookmarkCheck, BookOpen, Trophy } from "lucide-react";

export const Review: React.FC = () => {
  const { savedKanji } = useKanji();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "learning" | "mastered">("all");
  const [gradeFilter, setGradeFilter] = useState(0);

  // Filter saved kanji based on user filters
  const filteredKanji = savedKanji.filter((item) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchChar = item.kanji.character.includes(q);
      const matchMeaning = item.kanji.meaning.english.toLowerCase().includes(q);
      const matchKun = item.kunyomi_ja.toLowerCase().includes(q);
      const matchOn = item.onyomi_ja.toLowerCase().includes(q);
      if (!matchChar && !matchMeaning && !matchKun && !matchOn) return false;
    }

    // Status filter
    if (statusFilter === "learning" && item.mastered) return false;
    if (statusFilter === "mastered" && !item.mastered) return false;

    // Grade filter
    if (gradeFilter > 0 && item.grade !== gradeFilter) return false;

    return true;
  });

  const masteredCount = savedKanji.filter((k) => k.mastered).length;
  const progressPercent =
    savedKanji.length > 0 ? Math.round((masteredCount / savedKanji.length) * 100) : 0;

  return (
    <div className="py-5">
      <Container>
        {/* Header with Stats */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2" style={{ background: "rgba(99, 102, 241, 0.12)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
              <BookmarkCheck size={16} color="var(--accent-indigo)" />
              <span className="small text-white fw-semibold">Personal Memory Vault</span>
            </div>
            <h2 className="fw-bold text-white mb-1">Review & Master Saved Kanji</h2>
            <p className="text-secondary small mb-0">
              Study saved characters with animated stroke videos, audio pronunciation, and vocabulary
            </p>
          </div>

          {savedKanji.length > 0 && (
            <div className="d-flex align-items-center gap-3 glass-panel px-4 py-2">
              <div>
                <div className="small text-muted">Mastery Rate</div>
                <div className="text-white fw-bold fs-5">
                  {masteredCount} / {savedKanji.length}{" "}
                  <span className="text-success small fw-normal">({progressPercent}%)</span>
                </div>
              </div>
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "45px",
                  height: "45px",
                  background: "rgba(16, 185, 129, 0.15)",
                  color: "var(--accent-jade)",
                }}>
                <Trophy size={20} />
              </div>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        {savedKanji.length > 0 && (
          <ReviewFilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            gradeFilter={gradeFilter}
            setGradeFilter={setGradeFilter}
          />
        )}

        {/* Empty State */}
        {savedKanji.length === 0 ? (
          <div className="glass-panel p-5 text-center my-5 mx-auto" style={{ maxWidth: "560px" }}>
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "70px",
                height: "70px",
                background: "rgba(230, 57, 70, 0.12)",
                color: "var(--accent-vermilion)",
              }}>
              <BookOpen size={32} />
            </div>

            <h4 className="fw-bold text-white mb-2">Your Review Vault is Empty</h4>
            <p className="text-secondary mb-4">
              When guessing kanji in the Learn section, click <strong>"Save for Review"</strong> on cards you want to study in detail.
              They will be permanently stored here!
            </p>

            <Link to="/learn" className="btn-primary-gradient px-4 py-2">
              Go to Learn Section →
            </Link>
          </div>
        ) : filteredKanji.length === 0 ? (
          <div className="text-center py-5 text-secondary">
            No saved kanji matched your search filters.
          </div>
        ) : (
          <div>
            <div className="small text-secondary mb-3">
              Showing <strong>{filteredKanji.length}</strong> of{" "}
              <strong>{savedKanji.length}</strong> saved kanji
            </div>

            {filteredKanji.map((item) => (
              <ReviewCardItem key={item._id} item={item} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Review;
