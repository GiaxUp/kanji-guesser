import React from "react";
import { Search, Trash2 } from "lucide-react";
import { useKanji } from "../../context/KanjiContext";

interface ReviewFilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: "all" | "learning" | "mastered";
  setStatusFilter: (s: "all" | "learning" | "mastered") => void;
  gradeFilter: number;
  setGradeFilter: (g: number) => void;
}

export const ReviewFilterBar: React.FC<ReviewFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  gradeFilter,
  setGradeFilter,
}) => {
  const { savedKanji, clearAllSaved } = useKanji();

  return (
    <div className="glass-panel p-3 mb-4">
      <div className="row g-3 align-items-center">
        {/* Search input */}
        <div className="col-12 col-md-4">
          <div className="position-relative">
            <Search
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
            />
            <input
              type="text"
              className="form-control ps-5 bg-dark text-white border-secondary border-opacity-25"
              placeholder="Search saved kanji, meaning, or reading..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ borderRadius: "var(--radius-md)" }}
            />
          </div>
        </div>

        {/* Status Filter */}
        <div className="col-12 col-md-4 d-flex gap-1 justify-content-center">
          <button
            onClick={() => setStatusFilter("all")}
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "all" ? "btn-danger" : "btn-outline-secondary text-white"
            }`}>
            All ({savedKanji.length})
          </button>
          <button
            onClick={() => setStatusFilter("learning")}
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "learning" ? "btn-warning text-dark fw-bold" : "btn-outline-secondary text-white"
            }`}>
            In Progress ({savedKanji.filter((k) => !k.mastered).length})
          </button>
          <button
            onClick={() => setStatusFilter("mastered")}
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "mastered" ? "btn-success" : "btn-outline-secondary text-white"
            }`}>
            Mastered ({savedKanji.filter((k) => k.mastered).length})
          </button>
        </div>

        {/* Grade Filter & Clear */}
        <div className="col-12 col-md-4 d-flex justify-content-md-end gap-2">
          <select
            className="form-select form-select-sm bg-dark text-white border-secondary border-opacity-25 w-auto"
            value={gradeFilter}
            onChange={(e) => setGradeFilter(parseInt(e.target.value, 10))}
            style={{ borderRadius: "var(--radius-md)" }}>
            <option value={0}>All Grades</option>
            <option value={1}>Grade 1 (N5)</option>
            <option value={2}>Grade 2 (N5/N4)</option>
            <option value={3}>Grade 3 (N4)</option>
            <option value={4}>Grade 4 (N3)</option>
            <option value={5}>Grade 5 (N2/N1)</option>
          </select>

          {savedKanji.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all saved kanji?")) {
                  clearAllSaved();
                }
              }}
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
              style={{ borderRadius: "var(--radius-md)" }}
              title="Clear all saved cards">
              <Trash2 size={15} /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
