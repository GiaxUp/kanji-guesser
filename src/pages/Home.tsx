import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  BookOpen,
  PenTool,
  Trophy,
  BookmarkCheck,
  Search,
  History as HistoryIcon,
  Flame,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useKanji } from "../context/KanjiContext";
import { KANJI_DATASET } from "../data/kanjiDataset";
import { AudioButton } from "../components/common/AudioButton";
import { Badge } from "../components/common/Badge";

export const Home: React.FC = () => {
  const { streak, savedKanji } = useKanji();
  // Showcase a featured kanji
  const [featuredKanji] = useState(() => {
    return KANJI_DATASET[Math.floor(Math.random() * KANJI_DATASET.length)];
  });

  const masteredCount = savedKanji.filter((k) => k.mastered).length;

  return (
    <div className="py-5">
      <Container>
        {/* Hero Section */}
        <Row className="align-items-center gy-5 mb-5">
          <Col lg={7}>
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-3" style={{ background: "rgba(230, 57, 70, 0.12)", border: "1px solid rgba(230,57,70,0.3)" }}>
              <Sparkles size={16} color="var(--accent-vermilion)" />
              <span className="small text-white fw-semibold">Discover over 150+ Japanese Kanji</span>
            </div>

            <h1 className="display-4 fw-extrabold text-white mb-3" style={{ lineHeight: 1.15, fontWeight: 800 }}>
              Master Japanese Characters with <span style={{ color: "var(--accent-vermilion)", textShadow: "0 0 30px rgba(230,57,70,0.5)" }}>Kanji Guesser</span>
            </h1>

            <p className="lead text-secondary mb-4" style={{ maxWidth: "560px" }}>
              Learning kanji shouldn't be dry memorization. Guess meanings, practice writing strokes on an interactive canvas, listen to authentic native pronunciation, and test your knowledge with JLPT quizzes.
            </p>

            {/* Quick Action CTAs */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <Link to="/learn" className="btn-primary-gradient px-4 py-3 fs-6">
                <BookOpen size={18} /> Start Guessing Now <ArrowRight size={18} />
              </Link>
              <Link to="/practice" className="btn-secondary-dark px-4 py-3 fs-6">
                <PenTool size={18} /> Stroke Drawing Practice
              </Link>
            </div>

            {/* Quick Stats Banner */}
            <div className="d-flex gap-4 p-3 rounded-3 glass-panel" style={{ maxWidth: "480px" }}>
              <div>
                <div className="d-flex align-items-center gap-1 text-warning fw-bold fs-4">
                  <Flame size={22} color="var(--accent-gold)" /> {streak}
                </div>
                <div className="small text-white fw-bold">Current Streak</div>
              </div>
              <div className="border-start border-secondary border-opacity-25 ps-4">
                <div className="text-white fw-bold fs-4">{savedKanji.length}</div>
                <div className="small text-white fw-bold">In Review Vault</div>
              </div>
              <div className="border-start border-secondary border-opacity-25 ps-4">
                <div className="text-success fw-bold fs-4">{masteredCount}</div>
                <div className="small text-white fw-bold">Mastered</div>
              </div>
            </div>
          </Col>

          {/* Featured Kanji Showcase Card */}
          <Col lg={5} className="text-center">
            <div className="glass-panel p-4 position-relative mx-auto" style={{ maxWidth: "360px" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge-tag gold">Kanji of the Day</span>
                <Badge variant="vermilion">Grade {featuredKanji.grade}</Badge>
              </div>

              <div className="my-3 py-2">
                <h1
                  className="kanji-display text-white mb-2"
                  style={{
                    fontSize: "6.5rem",
                    textShadow: "0 0 35px rgba(230, 57, 70, 0.4)",
                  }}>
                  {featuredKanji.kanji.character}
                </h1>
                <h4 className="fw-bold text-white mb-1">{featuredKanji.kanji.meaning.english}</h4>
                <div className="text-white fw-semibold mt-1" style={{ fontSize: "0.9rem" }}>
                  <span className="text-warning fw-bold">{featuredKanji.kanji.strokes.count} strokes</span> • Radical: <span className="text-white fw-bold">{featuredKanji.radical?.character || featuredKanji.radical?.name.hiragana}</span> ({featuredKanji.radical?.meaning.english})
                </div>
              </div>

              <div className="p-3 rounded-3 bg-dark bg-opacity-75 text-start mb-3 border border-secondary border-opacity-25">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-white fw-bold small">訓 Kun'yomi:</span>
                  <span className="fw-bold text-white fs-6">{featuredKanji.kunyomi_ja}</span>
                  <AudioButton textToSpeak={featuredKanji.kunyomi_ja} size="sm" variant="gold" />
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white fw-bold small">音 On'yomi:</span>
                  <span className="fw-bold text-white fs-6">{featuredKanji.onyomi_ja}</span>
                  <AudioButton textToSpeak={featuredKanji.onyomi_ja} size="sm" variant="vermilion" />
                </div>
              </div>

              <Link to="/learn" className="btn btn-outline-warning w-100 rounded-pill py-2 small fw-bold">
                Guess more Kanji →
              </Link>
            </div>
          </Col>
        </Row>

        {/* Learning Modules Grid */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-white mb-2">Explore All Study Modes</h2>
            <p className="text-secondary">Comprehensive tools designed to build lasting character recognition</p>
          </div>

          <Row className="g-4">
            {/* Mode 1: Guesser */}
            <Col md={6} lg={4}>
              <Link to="/learn" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(230, 57, 70, 0.15)", color: "var(--accent-vermilion)" }}>
                      <BookOpen size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">3D Guessing Cards</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Challenge your recall with interactive flip cards, stroke counts, radical breakdowns, and native audio.
                    </p>
                  </div>
                  <div className="mt-4 text-warning small fw-bold d-flex align-items-center gap-1">
                    Start Guessing <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>

            {/* Mode 2: Stroke Practice Canvas */}
            <Col md={6} lg={4}>
              <Link to="/practice" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(245, 158, 11, 0.15)", color: "var(--accent-gold)" }}>
                      <PenTool size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">Calligraphy Canvas</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Practice writing kanji directly with your mouse or stylus! Trace ghost guides and track stroke accuracy.
                    </p>
                  </div>
                  <div className="mt-4 text-warning small fw-bold d-flex align-items-center gap-1">
                    Practice Writing <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>

            {/* Mode 3: JLPT Quiz */}
            <Col md={6} lg={4}>
              <Link to="/learn?tab=quiz" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--accent-jade)" }}>
                      <Trophy size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">Multiple Choice Quiz</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Rapid 4-choice questions testing meanings and readings with streak multipliers and celebratory milestones.
                    </p>
                  </div>
                  <div className="mt-4 text-success small fw-bold d-flex align-items-center gap-1">
                    Take Quiz <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>

            {/* Mode 4: Review Vault */}
            <Col md={6} lg={4}>
              <Link to="/review" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(99, 102, 241, 0.15)", color: "var(--accent-indigo)" }}>
                      <BookmarkCheck size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">Review Vault</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Save difficult kanji to study later with animated stroke videos, audio examples, and mastery status.
                    </p>
                  </div>
                  <div className="mt-4 text-info small fw-bold d-flex align-items-center gap-1">
                    Open Vault ({savedKanji.length}) <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>

            {/* Mode 5: Explorer */}
            <Col md={6} lg={4}>
              <Link to="/dictionary" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(236, 72, 153, 0.15)", color: "var(--accent-sakura)" }}>
                      <Search size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">Kanji Explorer</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Browse all characters by Grade or JLPT level, search by English or Japanese keywords, and inspect details.
                    </p>
                  </div>
                  <div className="mt-4 text-danger small fw-bold d-flex align-items-center gap-1">
                    Browse All <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>

            {/* Mode 6: History & Feedback */}
            <Col md={6} lg={4}>
              <Link to="/history" className="text-decoration-none">
                <div className="glass-panel p-4 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className="p-3 rounded-3 d-inline-flex mb-3"
                      style={{ background: "rgba(255, 255, 255, 0.08)", color: "#fff" }}>
                      <HistoryIcon size={28} />
                    </div>
                    <h4 className="fw-bold text-white mb-2">History & Feedback</h4>
                    <p className="text-white small mb-0" style={{ opacity: 0.9 }}>
                      Discover the origins of kanji from Chinese hànzì, On'yomi vs Kun'yomi, and share your ideas on our board.
                    </p>
                  </div>
                  <div className="mt-4 text-secondary small fw-bold d-flex align-items-center gap-1">
                    Read History <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
