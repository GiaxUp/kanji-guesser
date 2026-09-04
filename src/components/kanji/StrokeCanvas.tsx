import React, { useRef, useState, useEffect, useCallback } from "react";
import { KanjiItem } from "../../types/kanji";
import {
  Undo2,
  Eye,
  EyeOff,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Award,
} from "lucide-react";
import { audioService } from "../../services/audioService";
import confetti from "canvas-confetti";

interface StrokeCanvasProps {
  kanji: KanjiItem;
}

interface Point {
  x: number;
  y: number;
}

interface ReferenceGridData {
  grid: Uint8Array;
  dilatedGrid: Uint8Array;
  gridSize: number;
  totalRefPoints: number;
}

interface AccuracyEvaluation {
  accuracy: number;
  coverage: number;
  precision: number;
  status: "idle" | "in_progress" | "passed" | "needs_work" | "dot_cheat";
  message: string;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({ kanji }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const refDataRef = useRef<ReferenceGridData | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [userStrokeCount, setUserStrokeCount] = useState(0);
  const [evalResult, setEvalResult] = useState<AccuracyEvaluation>({
    accuracy: 0,
    coverage: 0,
    precision: 0,
    status: "idle",
    message: "Trace the kanji strokes in order to test your calligraphy accuracy.",
  });

  // Generate reference pixel mask of the kanji character
  const buildReferenceMask = useCallback(
    (width: number, height: number, dpr: number) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const octx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      octx.clearRect(0, 0, width, height);
      octx.fillStyle = "#ffffff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      // 13rem font matching .canvas-guide
      const fontSize = 13 * 16 * dpr;
      octx.font = `bold ${fontSize}px 'Noto Serif JP', 'Yu Mincho', serif`;
      octx.fillText(kanji.kanji.character, width / 2, height / 2);

      const gridSize = 80;
      const grid = new Uint8Array(gridSize * gridSize);
      const imgData = octx.getImageData(0, 0, width, height).data;

      const stepX = width / gridSize;
      const stepY = height / gridSize;
      let totalRefPoints = 0;

      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          const px = Math.floor((gx + 0.5) * stepX);
          const py = Math.floor((gy + 0.5) * stepY);
          const idx = (py * width + px) * 4;
          if (imgData[idx + 3] > 35) {
            grid[gy * gridSize + gx] = 1;
            totalRefPoints++;
          }
        }
      }

      // Dilated tolerance mask (radius of 3 cells ≈ 12 CSS px) to allow natural handwriting variance
      const dilatedGrid = new Uint8Array(gridSize * gridSize);
      const radius = 3;
      for (let gy = 0; gy < gridSize; gy++) {
        for (let gx = 0; gx < gridSize; gx++) {
          if (grid[gy * gridSize + gx] === 1) {
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const ny = gy + dy;
                const nx = gx + dx;
                if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                  dilatedGrid[ny * gridSize + nx] = 1;
                }
              }
            }
          }
        }
      }

      refDataRef.current = { grid, dilatedGrid, gridSize, totalRefPoints };
    },
    [kanji.kanji.character]
  );

  // Setup canvas resolution and DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#e63946"; // Vermilion brush color
    ctx.lineWidth = 12;

    buildReferenceMask(canvas.width, canvas.height, dpr);
    clearCanvas();
  }, [kanji.kanji.character, buildReferenceMask]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokeHistory((prev) => [...prev, imgData]);
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    saveState();
    setIsDrawing(true);

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    e.preventDefault();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  // Evaluate user drawing against reference mask
  const evaluateDrawing = (strokeCount: number): AccuracyEvaluation => {
    const canvas = canvasRef.current;
    if (!canvas || !refDataRef.current) {
      return {
        accuracy: 0,
        coverage: 0,
        precision: 0,
        status: "idle",
        message: "Canvas not ready",
      };
    }

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return {
        accuracy: 0,
        coverage: 0,
        precision: 0,
        status: "idle",
        message: "Canvas context unavailable",
      };
    }

    const { grid, dilatedGrid, gridSize, totalRefPoints } = refDataRef.current;
    if (totalRefPoints === 0) {
      return {
        accuracy: 100,
        coverage: 100,
        precision: 100,
        status: "passed",
        message: "Perfect match!",
      };
    }

    const userImgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const stepX = canvas.width / gridSize;
    const stepY = canvas.height / gridSize;

    const userGrid = new Uint8Array(gridSize * gridSize);
    let userDrawnCells = 0;
    let inBoundsCells = 0;

    for (let gy = 0; gy < gridSize; gy++) {
      for (let gx = 0; gx < gridSize; gx++) {
        const px = Math.floor((gx + 0.5) * stepX);
        const py = Math.floor((gy + 0.5) * stepY);
        const idx = (py * canvas.width + px) * 4;

        if (userImgData[idx + 3] > 40) {
          userGrid[gy * gridSize + gx] = 1;
          userDrawnCells++;
          if (dilatedGrid[gy * gridSize + gx] === 1) {
            inBoundsCells++;
          }
        }
      }
    }

    // Check for dot cheat: barely drawn anything
    const minRequiredCells = totalRefPoints * 0.15;
    if (userDrawnCells < minRequiredCells) {
      const dotAcc = Math.round((userDrawnCells / totalRefPoints) * 50);
      return {
        accuracy: dotAcc,
        coverage: Math.round((userDrawnCells / totalRefPoints) * 100),
        precision: userDrawnCells > 0 ? Math.round((inBoundsCells / userDrawnCells) * 100) : 0,
        status: "dot_cheat",
        message: `Accuracy: ${dotAcc}% — Short dots detected. Please trace full strokes from start to finish!`,
      };
    }

    // Compute coverage of reference points (using 2-cell radius)
    let coveredRefPoints = 0;
    const coverageRadius = 2;
    for (let gy = 0; gy < gridSize; gy++) {
      for (let gx = 0; gx < gridSize; gx++) {
        if (grid[gy * gridSize + gx] === 1) {
          let covered = false;
          for (let dy = -coverageRadius; dy <= coverageRadius && !covered; dy++) {
            for (let dx = -coverageRadius; dx <= coverageRadius && !covered; dx++) {
              const ny = gy + dy;
              const nx = gx + dx;
              if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                if (userGrid[ny * gridSize + nx] === 1) {
                  covered = true;
                }
              }
            }
          }
          if (covered) coveredRefPoints++;
        }
      }
    }

    const coverageRate = Math.min(1, coveredRefPoints / totalRefPoints);
    const precisionRate = userDrawnCells > 0 ? inBoundsCells / userDrawnCells : 0;

    // Weighted match: 65% coverage + 35% precision inside character lines
    const rawMatch = coverageRate * 0.65 + precisionRate * 0.35;
    const accuracy = Math.round(Math.min(100, Math.max(0, rawMatch * 100)));
    const coverage = Math.round(coverageRate * 100);
    const precision = Math.round(precisionRate * 100);

    const targetStrokes = kanji.kanji.strokes.count;
    const isCountMatch = strokeCount >= targetStrokes - 1 && strokeCount <= targetStrokes + 2;

    if (accuracy >= 70 && isCountMatch) {
      return {
        accuracy,
        coverage,
        precision,
        status: "passed",
        message:
          accuracy >= 90
            ? `🌟 Master Calligrapher! Outstanding ${accuracy}% accuracy!`
            : `✨ Splendid! Passed with ${accuracy}% shape accuracy (${strokeCount}/${targetStrokes} strokes)!`,
      };
    } else if (strokeCount >= targetStrokes) {
      return {
        accuracy,
        coverage,
        precision,
        status: "needs_work",
        message: `Strokes reached (${strokeCount}/${targetStrokes}), but shape accuracy is ${accuracy}%. Trace more closely over the guide!`,
      };
    } else {
      return {
        accuracy,
        coverage,
        precision,
        status: "in_progress",
        message: `Current match: ${accuracy}% (Covered: ${coverage}% | Precision: ${precision}%). Continue drawing...`,
      };
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const newCount = userStrokeCount + 1;
    setUserStrokeCount(newCount);

    audioService.playClickSound();

    // Evaluate accuracy
    const evaluation = evaluateDrawing(newCount);
    setEvalResult(evaluation);

    // Only celebrate if user actually drew the kanji accurately!
    if (evaluation.status === "passed") {
      audioService.playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#e63946", "#f59e0b", "#10b981", "#3b82f6"],
      });
    } else if (evaluation.status === "dot_cheat") {
      audioService.playClickSound();
    }
  };

  const handleManualCheck = () => {
    const evaluation = evaluateDrawing(userStrokeCount);
    setEvalResult(evaluation);
    if (evaluation.status === "passed") {
      audioService.playSuccessSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
        colors: ["#e63946", "#f59e0b", "#10b981"],
      });
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length === 0) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const previousState = strokeHistory[strokeHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory((prev) => prev.slice(0, prev.length - 1));
    const newCount = Math.max(0, userStrokeCount - 1);
    setUserStrokeCount(newCount);

    audioService.playClickSound();
    const evaluation = evaluateDrawing(newCount);
    setEvalResult(evaluation);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeHistory([]);
    setUserStrokeCount(0);
    setEvalResult({
      accuracy: 0,
      coverage: 0,
      precision: 0,
      status: "idle",
      message: "Trace the kanji strokes in order to test your calligraphy accuracy.",
    });
    audioService.playClickSound();
  };

  return (
    <div className="glass-panel p-4 text-center mx-auto" style={{ maxWidth: "420px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-start">
          <h5 className="fw-bold text-white mb-0">Calligraphy Canvas</h5>
          <span className="small text-muted">Practice writing 「{kanji.kanji.character}」</span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <span
            className={`badge-tag ${
              evalResult.status === "passed"
                ? "jade"
                : userStrokeCount >= kanji.kanji.strokes.count
                ? "vermilion"
                : "default"
            }`}>
            {userStrokeCount} / {kanji.kanji.strokes.count} strokes
          </span>
        </div>
      </div>

      {/* Accuracy Meter Gauge */}
      <div
        className="p-2 px-3 rounded-3 mb-3 d-flex flex-column gap-1 text-start"
        style={{
          background: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}>
        <div className="d-flex justify-content-between align-items-center small">
          <span className="text-white fw-bold d-flex align-items-center gap-1">
            <Award size={14} color="var(--accent-gold)" /> Accuracy Score
          </span>
          <span
            className={`fw-extrabold ${
              evalResult.accuracy >= 70
                ? "text-success"
                : evalResult.accuracy >= 40
                ? "text-warning"
                : "text-danger"
            }`}
            style={{ fontSize: "0.95rem" }}>
            {evalResult.accuracy}%
          </span>
        </div>

        <div
          className="w-100 rounded-pill overflow-hidden"
          style={{ height: "8px", background: "rgba(255, 255, 255, 0.1)" }}>
          <div
            className="h-100 rounded-pill transition-all"
            style={{
              width: `${evalResult.accuracy}%`,
              background:
                evalResult.accuracy >= 70
                  ? "linear-gradient(90deg, #10b981, #34d399)"
                  : evalResult.accuracy >= 40
                  ? "linear-gradient(90deg, #f59e0b, #fbbf24)"
                  : "linear-gradient(90deg, #e63946, #f87171)",
              transition: "width 0.3s ease",
            }}
          />
        </div>
      </div>

      {/* The interactive canvas with background guide */}
      <div className="canvas-wrapper position-relative mx-auto">
        {/* Subtle grid crosshairs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRight: "1px dashed rgba(255,255,255,0.06)",
            borderBottom: "1px dashed rgba(255,255,255,0.06)",
            width: "50%",
            height: "50%",
            pointerEvents: "none",
          }}
        />

        {showGuide && <div className="canvas-guide">{kanji.kanji.character}</div>}

        <canvas
          ref={canvasRef}
          className="drawing-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Control Buttons */}
      <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
        <button
          onClick={() => setShowGuide(!showGuide)}
          className="btn-secondary-dark btn-sm"
          title={showGuide ? "Hide background guide" : "Show background guide"}>
          {showGuide ? <EyeOff size={15} /> : <Eye size={15} />}
          {showGuide ? "Hide Guide" : "Show Guide"}
        </button>

        <button
          onClick={undo}
          disabled={strokeHistory.length === 0}
          className="btn-secondary-dark btn-sm"
          title="Undo last stroke">
          <Undo2 size={15} /> Undo
        </button>

        <button
          onClick={clearCanvas}
          className="btn-secondary-dark btn-sm text-danger"
          title="Clear canvas">
          <RotateCcw size={15} /> Clear
        </button>

        <button
          onClick={handleManualCheck}
          className="btn-secondary-dark btn-sm text-warning"
          title="Check stroke accuracy">
          <Sparkles size={15} /> Check Accuracy
        </button>
      </div>

      {/* Status Feedback Message Box */}
      <div
        className="mt-3 p-2 px-3 rounded-3 text-start small d-flex align-items-center gap-2"
        style={{
          background:
            evalResult.status === "passed"
              ? "rgba(16, 185, 129, 0.12)"
              : evalResult.status === "dot_cheat" || evalResult.status === "needs_work"
              ? "rgba(230, 57, 70, 0.12)"
              : "rgba(255, 255, 255, 0.04)",
          border:
            evalResult.status === "passed"
              ? "1px solid rgba(16, 185, 129, 0.35)"
              : evalResult.status === "dot_cheat" || evalResult.status === "needs_work"
              ? "1px solid rgba(230, 57, 70, 0.35)"
              : "1px solid rgba(255, 255, 255, 0.08)",
        }}>
        {evalResult.status === "passed" ? (
          <CheckCircle2 size={18} className="text-success flex-shrink-0" />
        ) : evalResult.status === "dot_cheat" || evalResult.status === "needs_work" ? (
          <AlertCircle size={18} className="text-danger flex-shrink-0" />
        ) : (
          <Sparkles size={18} className="text-muted flex-shrink-0" />
        )}
        <span
          className={`fw-medium ${
            evalResult.status === "passed"
              ? "text-success"
              : evalResult.status === "dot_cheat" || evalResult.status === "needs_work"
              ? "text-danger"
              : "text-white"
          }`}>
          {evalResult.message}
        </span>
      </div>
    </div>
  );
};
