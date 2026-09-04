import React, { useState, useEffect } from "react";
import { FeedbackComment } from "../../types/kanji";
import { INITIAL_COMMENTS } from "../../data/sampleComments";
import { ThumbsUp, Send, MessageSquare, Sparkles } from "lucide-react";
import { audioService } from "../../services/audioService";
import axios from "axios";

export const FeedbackBoard: React.FC = () => {
  const [comments, setComments] = useState<FeedbackComment[]>(() => {
    try {
      const stored = localStorage.getItem("kanjiCommunityComments");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return INITIAL_COMMENTS;
  });

  const [authorName, setAuthorName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [category, setCategory] = useState<"feedback" | "suggestion" | "bug">("feedback");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("kanjiCommunityComments", JSON.stringify(comments));
    } catch {
      // Ignore
    }
  }, [comments]);

  // Try fetching from VITE_DB if configured
  useEffect(() => {
    const dbUrl = import.meta.env.VITE_DB;
    if (dbUrl) {
      axios
        .get(`${dbUrl}/comments`)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setComments(res.data);
          }
        })
        .catch(() => {
          // Keep local comments gracefully
        });
    }
  }, []);

  const handleUpvote = (id: string) => {
    audioService.playClickSound();
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    audioService.playSuccessSound();

    const newComment: FeedbackComment = {
      id: `fb-${Date.now()}`,
      author: authorName.trim() || "Anonymous Learner",
      avatarSeed: (authorName.trim() || "learner").toLowerCase().replace(/\s+/g, ""),
      category,
      text: commentText.trim(),
      upvotes: 1,
      createdAt: "Just now",
    };

    // Post to remote DB if configured
    const dbUrl = import.meta.env.VITE_DB;
    if (dbUrl) {
      axios.post(`${dbUrl}/comments`, newComment).catch(() => {});
    }

    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
    setAuthorName("");
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const filteredComments =
    filterCategory === "all"
      ? comments
      : comments.filter((c) => c.category === filterCategory);

  return (
    <div id="feedback" className="mt-5 pt-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <MessageSquare size={24} color="var(--accent-vermilion)" />
        <h3 className="fw-bold text-white mb-0">Community Feedback & Ideas</h3>
      </div>
      <p className="text-white mb-4">
        Tell me what you think about this web app! Feel free to leave feedback, feature suggestions, or study tips.
      </p>

      {/* Submission Form */}
      <div className="glass-panel p-4 mb-4">
        <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
          <Sparkles size={18} color="var(--accent-gold)" /> Leave Your Thoughts
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label small text-white fw-bold">Your Name or Handle (optional)</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-secondary border-opacity-25"
                placeholder="e.g. Kenji, Sarah, Anonymous"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                style={{ borderRadius: "var(--radius-md)" }}
              />
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small text-white fw-bold">Category</label>
              <select
                className="form-select bg-dark text-white border-secondary border-opacity-25"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                style={{ borderRadius: "var(--radius-md)" }}>
                <option value="feedback">General Feedback & Praise</option>
                <option value="suggestion">Feature Suggestion</option>
                <option value="bug">Question or Bug Report</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small text-white fw-bold">Comment</label>
            <textarea
              className="form-control bg-dark text-white border-secondary border-opacity-25"
              rows={3}
              placeholder="What features would you love to see? How is your kanji learning journey going?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
              style={{ borderRadius: "var(--radius-md)" }}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {submitSuccess && (
              <span className="text-success small fw-bold">
                Thank you! Your comment was posted successfully.
              </span>
            )}
            <div className="ms-auto">
              <button
                type="submit"
                disabled={isSubmitting || !commentText.trim()}
                className="btn-primary-gradient px-4 py-2">
                <Send size={16} /> Post Comment
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex gap-2 mb-3 flex-wrap">
        <button
          onClick={() => setFilterCategory("all")}
          className={`btn btn-sm rounded-pill px-3 ${
            filterCategory === "all" ? "btn-danger" : "btn-outline-secondary text-white"
          }`}>
          All ({comments.length})
        </button>
        <button
          onClick={() => setFilterCategory("suggestion")}
          className={`btn btn-sm rounded-pill px-3 ${
            filterCategory === "suggestion" ? "btn-warning text-dark fw-bold" : "btn-outline-secondary text-white"
          }`}>
          Suggestions ({comments.filter((c) => c.category === "suggestion").length})
        </button>
        <button
          onClick={() => setFilterCategory("feedback")}
          className={`btn btn-sm rounded-pill px-3 ${
            filterCategory === "feedback" ? "btn-info text-dark fw-bold" : "btn-outline-secondary text-white"
          }`}>
          Feedback ({comments.filter((c) => c.category === "feedback").length})
        </button>
        <button
          onClick={() => setFilterCategory("bug")}
          className={`btn btn-sm rounded-pill px-3 ${
            filterCategory === "bug" ? "btn-secondary text-white" : "btn-outline-secondary text-white"
          }`}>
          Questions ({comments.filter((c) => c.category === "bug").length})
        </button>
      </div>

      {/* Comments List */}
      <div className="d-flex flex-column gap-3">
        {filteredComments.map((c) => (
          <div key={c.id} className="glass-panel p-3">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center gap-2">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, #e63946, #4361ee)",
                    fontSize: "0.9rem",
                  }}>
                  {c.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="fw-bold text-white small">{c.author}</div>
                  <div className="text-white fw-medium" style={{ fontSize: "0.8rem", opacity: 0.9 }}>
                    {c.createdAt}
                  </div>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className={`badge-tag ${
                    c.category === "suggestion"
                      ? "gold"
                      : c.category === "bug"
                      ? "default"
                      : "vermilion"
                  }`}>
                  {c.category}
                </span>

                <button
                  onClick={() => handleUpvote(c.id)}
                  className="btn btn-sm btn-outline-secondary text-white d-flex align-items-center gap-1 rounded-pill px-2 py-1"
                  style={{ fontSize: "0.8rem" }}>
                  <ThumbsUp size={13} /> {c.upvotes}
                </button>
              </div>
            </div>

            <p className="text-white small mb-0 ps-1" style={{ whiteSpace: "pre-line" }}>
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
