import React, { useState, useEffect } from "react";
import { kanjiService } from "../../services/kanjiService";
import { QuizQuestion } from "../../types/kanji";
import { audioService } from "../../services/audioService";
import { useKanji } from "../../context/KanjiContext";
import { CheckCircle2, XCircle, Trophy, RotateCcw, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { AudioButton } from "../common/AudioButton";

interface QuizModeProps {
  grade?: number;
}

export const QuizMode: React.FC<QuizModeProps> = ({ grade }) => {
  const { incrementStreak, resetStreak } = useKanji();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    startNewQuiz();
  }, [grade]);

  const startNewQuiz = () => {
    const generated = kanjiService.generateQuizQuestions(8, grade);
    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const handleSelectOption = (option: string) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      audioService.playSuccessSound();
      setScore((prev) => prev + 1);
      incrementStreak();
    } else {
      audioService.playFailureSound();
      resetStreak();
    }
  };

  const handleNextQuestion = () => {
    audioService.playClickSound();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Quiz finished
      setQuizFinished(true);
      audioService.playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#e63946", "#f59e0b", "#10b981", "#6366f1"],
      });
    }
  };

  if (questions.length === 0) {
    return <div className="text-center text-muted py-5">Loading quiz questions...</div>;
  }

  const currentQ = questions[currentIndex];

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="glass-panel p-5 text-center mx-auto" style={{ maxWidth: "500px" }}>
        <div
          className="mx-auto mb-3 d-flex align-items-center justify-content-center"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(245, 158, 11, 0.15)",
            border: "2px solid var(--accent-gold)",
          }}>
          <Trophy size={40} color="var(--accent-gold)" />
        </div>

        <h3 className="fw-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-secondary mb-4">
          You scored <strong className="text-white">{score}</strong> out of{" "}
          <strong className="text-white">{questions.length}</strong> ({percentage}%)
        </p>

        <div className="p-3 rounded-3 mb-4" style={{ background: "rgba(255,255,255,0.04)" }}>
          <p className="mb-0 text-white small">
            {percentage >= 80
              ? "🌟 Outstanding! You have great command of these kanji characters."
              : percentage >= 50
              ? "👍 Good progress! Review the missed kanji in the Vault to achieve perfection."
              : "💪 Keep practicing! Spaced repetition and writing practice will cement them."}
          </p>
        </div>

        <button onClick={startNewQuiz} className="btn-primary-gradient px-4 py-2">
          <RotateCcw size={18} /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="glass-panel p-4 mx-auto" style={{ maxWidth: "560px" }}>
      {/* Quiz Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="badge-tag vermilion">
          Question {currentIndex + 1} of {questions.length}
        </span>

        <div className="d-flex align-items-center gap-2">
          <span className="badge-tag gold">
            Score: {score} / {currentIndex + (isAnswered ? 1 : 0)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-100 rounded-pill mb-4 overflow-hidden"
        style={{ height: "6px", background: "rgba(255,255,255,0.08)" }}>
        <div
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, var(--accent-vermilion), var(--accent-gold))",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Prompt Card */}
      <div className="text-center py-4 px-3 rounded-3 mb-4" style={{ background: "rgba(255,255,255,0.03)" }}>
        {currentQ.type === "meaning" ? (
          <div>
            <span
              className="kanji-display d-block text-white mb-2"
              style={{ fontSize: "5rem", textShadow: "0 0 25px rgba(230, 57, 70, 0.4)" }}>
              {currentQ.kanji.kanji.character}
            </span>
            <div className="d-flex justify-content-center">
              <AudioButton
                textToSpeak={currentQ.kanji.kanji.character}
                label="Listen"
                size="sm"
                variant="gold"
              />
            </div>
            <h5 className="fw-semibold text-white mt-3 mb-0">What is the English meaning?</h5>
          </div>
        ) : (
          <div>
            <span className="badge-tag jade mb-2">Meaning Prompt</span>
            <h3 className="fw-bold text-white mb-3">"{currentQ.kanji.kanji.meaning.english}"</h3>
            <h6 className="text-secondary mb-0">Select the correct kanji character:</h6>
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className="d-grid gap-2" style={{ gridTemplateColumns: currentQ.type === "kanji" ? "1fr 1fr" : "1fr" }}>
        {currentQ.options.map((option, idx) => {
          let btnStyle = "rgba(255,255,255,0.05)";
          let borderColor = "rgba(255,255,255,0.1)";
          let textColor = "var(--text-primary)";

          if (isAnswered) {
            if (option === currentQ.correctAnswer) {
              btnStyle = "rgba(16, 185, 129, 0.25)";
              borderColor = "var(--accent-jade)";
              textColor = "#6ee7b7";
            } else if (option === selectedOption) {
              btnStyle = "rgba(230, 57, 70, 0.25)";
              borderColor = "var(--accent-vermilion)";
              textColor = "#ff8b94";
            } else {
              btnStyle = "rgba(255,255,255,0.02)";
              textColor = "var(--text-muted)";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={isAnswered}
              className="btn p-3 text-start d-flex align-items-center justify-content-between rounded-3 transition-all"
              style={{
                background: btnStyle,
                border: `1px solid ${borderColor}`,
                color: textColor,
                fontSize: currentQ.type === "kanji" ? "1.8rem" : "1rem",
                fontFamily: currentQ.type === "kanji" ? "var(--font-kanji)" : "var(--font-ui)",
                fontWeight: 600,
                textAlign: currentQ.type === "kanji" ? "center" : "left",
              }}>
              <span className={currentQ.type === "kanji" ? "mx-auto" : ""}>{option}</span>
              {isAnswered && option === currentQ.correctAnswer && (
                <CheckCircle2 size={20} className="text-success" />
              )}
              {isAnswered && option === selectedOption && option !== currentQ.correctAnswer && (
                <XCircle size={20} className="text-danger" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next button */}
      {isAnswered && (
        <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
          <p className="small text-secondary mb-3">{currentQ.explanation}</p>
          <button
            onClick={handleNextQuestion}
            className="btn-primary-gradient w-100 py-2 d-flex align-items-center justify-content-center gap-2">
            {currentIndex + 1 < questions.length ? (
              <>
                Next Question <ArrowRight size={18} />
              </>
            ) : (
              <>
                View Results <Trophy size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
