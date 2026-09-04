import React, { useState, useEffect } from "react";
import { Container, Alert, Accordion } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useKanji } from "../context/KanjiContext";
import { kanjiService } from "../services/kanjiService";
import { KanjiItem } from "../types/kanji";
import { KanjiCard } from "../components/kanji/KanjiCard";
import { StrokeCanvas } from "../components/kanji/StrokeCanvas";
import { QuizMode } from "../components/quiz/QuizMode";
import { audioService } from "../services/audioService";
import {
  BookOpen,
  PenTool,
  Trophy,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export const Learn: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedGrade, setSelectedGrade, saveKanjiForReview, savedKanji } = useKanji();

  const [activeTab, setActiveTab] = useState<"card" | "canvas" | "quiz">(() => {
    const tab = searchParams.get("tab");
    return tab === "canvas" || tab === "quiz" ? tab : "card";
  });

  const [deck, setDeck] = useState<KanjiItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [saveAlert, setSaveAlert] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: "",
  });

  // Load kanji deck for current grade
  useEffect(() => {
    const list = kanjiService.getKanjiList(selectedGrade);
    setDeck(list);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedGrade]);

  // Sync tab with URL search parameter
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "canvas" || tab === "quiz" || tab === "card") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Keyboard controls for fast learning: Space flips, Right moves to next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "card") return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === "Space") {
        e.preventDefault();
        audioService.playCardFlipSound();
        setIsFlipped((prev) => !prev);
      } else if (e.code === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, currentIndex, deck.length]);

  const handleNext = () => {
    if (deck.length === 0) return;
    audioService.playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % deck.length);
  };

  const handlePrev = () => {
    if (deck.length === 0) return;
    audioService.playClickSound();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + deck.length) % deck.length);
  };

  const handleShuffle = () => {
    audioService.playClickSound();
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleSaveForReview = () => {
    const currentKanji = deck[currentIndex];
    if (!currentKanji) return;

    audioService.playSuccessSound();
    const added = saveKanjiForReview(currentKanji);

    setSaveAlert({
      show: true,
      msg: added
        ? `「${currentKanji.kanji.character}」 added to your Review Vault!`
        : `「${currentKanji.kanji.character}」 is already saved in your Review Vault.`,
    });

    setTimeout(() => {
      setSaveAlert({ show: false, msg: "" });
    }, 2500);
  };

  const currentKanji = deck[currentIndex];
  const isCurrentSaved =
    currentKanji &&
    savedKanji.some((k) => k.kanji.character === currentKanji.kanji.character);

  return (
    <div className="py-5">
      <Container>
        {/* Header with Difficulty Select & Mode Switcher */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <h2 className="fw-bold text-white mb-1">Kanji Learning Hub</h2>
            <p className="text-secondary small mb-0">
              Interactive flashcards, writing canvas, and speed quiz challenge
            </p>
          </div>

          {/* Grade Difficulty Switcher */}
          <div className="d-flex align-items-center gap-2">
            <span className="small text-secondary fw-semibold">Difficulty Grade:</span>
            <select
              className="form-select bg-dark text-white border-secondary border-opacity-25"
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(parseInt(e.target.value, 10))}
              style={{ width: "auto", borderRadius: "var(--radius-md)" }}>
              <option value={0}>All Grades (260+ Kanji)</option>
              <option value={1}>Grade 1 (N5 Foundations)</option>
              <option value={2}>Grade 2 (N5/N4 Intermediate)</option>
              <option value={3}>Grade 3 (N4 Daily Life)</option>
              <option value={4}>Grade 4 (N3 Fluency)</option>
              <option value={5}>Grade 5 (N2/N1 Advanced)</option>
            </select>
          </div>
        </div>

        {/* Study Mode Navigation Tabs */}
        <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
          <button
            onClick={() => {
              setActiveTab("card");
              setSearchParams({ tab: "card" });
            }}
            className={`btn px-4 py-2 rounded-pill d-flex align-items-center gap-2 ${
              activeTab === "card"
                ? "btn-danger fw-bold shadow"
                : "btn-secondary-dark"
            }`}>
            <BookOpen size={17} /> 3D Guesser Card
          </button>

          <button
            onClick={() => {
              setActiveTab("canvas");
              setSearchParams({ tab: "canvas" });
            }}
            className={`btn px-4 py-2 rounded-pill d-flex align-items-center gap-2 ${
              activeTab === "canvas"
                ? "btn-warning text-dark fw-bold shadow"
                : "btn-secondary-dark"
            }`}>
            <PenTool size={17} /> Writing Canvas
          </button>

          <button
            onClick={() => {
              setActiveTab("quiz");
              setSearchParams({ tab: "quiz" });
            }}
            className={`btn px-4 py-2 rounded-pill d-flex align-items-center gap-2 ${
              activeTab === "quiz"
                ? "btn-success fw-bold shadow"
                : "btn-secondary-dark"
            }`}>
            <Trophy size={17} /> JLPT Quiz Challenge
          </button>
        </div>

        {/* Save Notification Toast */}
        {saveAlert.show && (
          <Alert
            variant="success"
            className="mx-auto text-center py-2 px-4 shadow mb-4 d-flex align-items-center justify-content-center gap-2"
            style={{ maxWidth: "420px", borderRadius: "var(--radius-md)" }}>
            <CheckCircle2 size={18} /> {saveAlert.msg}
          </Alert>
        )}

        {/* --- TAB CONTENT 1: CARD GUESSER --- */}
        {activeTab === "card" && currentKanji && (
          <div className="text-center">
            {/* Card Index & Counter */}
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <span className="small text-secondary">
                Card <strong className="text-white">{currentIndex + 1}</strong> of{" "}
                <strong className="text-white">{deck.length}</strong>
              </span>

              <button
                onClick={handleShuffle}
                className="btn btn-sm btn-outline-secondary text-white rounded-pill px-2 py-0 d-flex align-items-center gap-1"
                style={{ fontSize: "0.75rem" }}
                title="Shuffle cards">
                <Shuffle size={12} /> Shuffle
              </button>
            </div>

            {/* 3D Flipping Card */}
            <KanjiCard
              kanji={currentKanji}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
              onNext={handleNext}
              onSaveForReview={handleSaveForReview}
              isSaved={isCurrentSaved}
            />

            {/* Navigation & Action Bar */}
            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
              <button
                onClick={handlePrev}
                className="btn-secondary-dark px-3 py-2"
                title="Previous card (Left Arrow)">
                <ChevronLeft size={20} /> Prev
              </button>

              <button
                onClick={handleSaveForReview}
                disabled={isCurrentSaved}
                className={`btn px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isCurrentSaved ? "btn-secondary opacity-75" : "btn-gold-outline"
                }`}>
                <BookmarkPlus size={18} /> {isCurrentSaved ? "Saved" : "Save for Review"}
              </button>

              <button
                onClick={handleNext}
                className="btn-primary-gradient px-4 py-2"
                title="Next card (Right Arrow or Click)">
                Next Card <ChevronRight size={20} />
              </button>
            </div>

            <p className="small text-muted mt-3">
              Tip: Press <kbd className="bg-dark text-white px-1 py-0.5 rounded border border-secondary">Space</kbd> to flip, and <kbd className="bg-dark text-white px-1 py-0.5 rounded border border-secondary">→</kbd> for next card.
            </p>
          </div>
        )}

        {/* --- TAB CONTENT 2: STROKE CANVAS --- */}
        {activeTab === "canvas" && currentKanji && (
          <div>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <button onClick={handlePrev} className="btn-secondary-dark btn-sm">
                <ChevronLeft size={16} /> Prev Kanji
              </button>
              <span className="small text-secondary">
                Kanji <strong className="text-white">{currentIndex + 1}</strong> of {deck.length}
              </span>
              <button onClick={handleNext} className="btn-secondary-dark btn-sm">
                Next Kanji <ChevronRight size={16} />
              </button>
            </div>

            <StrokeCanvas kanji={currentKanji} />
          </div>
        )}

        {/* --- TAB CONTENT 3: QUIZ CHALLENGE --- */}
        {activeTab === "quiz" && <QuizMode grade={selectedGrade} />}

        {/* Rules & Study Guide Accordion (Preserved from v1.0) */}
        <div className="mt-5 pt-4" style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div className="d-flex align-items-center gap-2 mb-3">
            <HelpCircle size={20} color="var(--accent-gold)" />
            <h5 className="fw-bold text-white mb-0">Study Guide & Rules</h5>
          </div>

          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0" className="mb-3">
              <Accordion.Header>How to Play the Guessing Game</Accordion.Header>
              <Accordion.Body>
                Welcome to <strong>Kanji Guesser</strong>! Over 150 kanji cards are available across grades.
                Try to guess the English meaning by looking at the character, radical, and stroke count.
                Click on the card to flip it and reveal the full translations, On'yomi, Kun'yomi readings, and real-life vocabulary examples.
                <br /><br />
                If you find a character difficult or want to practice drawing it later, click <strong>"Save for Review"</strong> to add it to your permanent <strong>Review Vault</strong>.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Review Vault & Spaced Repetition</Accordion.Header>
              <Accordion.Body>
                The <strong>Review Vault</strong> in the navbar keeps all your saved kanji permanently in your browser's storage.
                Inside the vault, you can watch animated stroke videos, listen to native Japanese pronunciation, and mark characters as <strong>"Mastered"</strong> once you feel confident.
                <br /><br />
                Unlike older versions, your saved cards <strong>will never be cleared automatically</strong> when switching pages! You have full control to study at your own pace.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </div>
  );
};

export default Learn;
