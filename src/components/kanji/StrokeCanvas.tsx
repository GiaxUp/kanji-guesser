import React, { useRef, useState, useEffect } from "react";
import { KanjiItem } from "../../types/kanji";
import { Undo2, Eye, EyeOff, CheckCircle2, RotateCcw } from "lucide-react";
import { audioService } from "../../services/audioService";
import confetti from "canvas-confetti";

interface StrokeCanvasProps {
  kanji: KanjiItem;
}

interface Point {
  x: number;
  y: number;
}

export const StrokeCanvas: React.FC<StrokeCanvasProps> = ({ kanji }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [userStrokeCount, setUserStrokeCount] = useState(0);

  // Setup canvas resolution and DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set high-DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Initial clear
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#e63946"; // Vermilion brush color
    ctx.lineWidth = 10;

    // Reset strokes on kanji change
    clearCanvas();
  }, [kanji.kanji.character]);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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
    const ctx = canvas.getContext("2d");
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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCoordinates(e);
    if (!coords) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const newCount = userStrokeCount + 1;
    setUserStrokeCount(newCount);

    audioService.playClickSound();

    // If user hit the exact required stroke count, trigger praise
    if (newCount === kanji.kanji.strokes.count) {
      audioService.playSuccessSound();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#e63946", "#f59e0b", "#f472b6"],
      });
    }
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokeHistory.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const previousState = strokeHistory[strokeHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory((prev) => prev.slice(0, prev.length - 1));
    setUserStrokeCount((prev) => Math.max(0, prev - 1));
    audioService.playClickSound();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeHistory([]);
    setUserStrokeCount(0);
    audioService.playClickSound();
  };

  return (
    <div className="glass-panel p-4 text-center mx-auto" style={{ maxWidth: "420px" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="fw-bold text-white mb-0">Calligraphy Canvas</h5>
          <span className="small text-muted">Practice writing 「{kanji.kanji.character}」</span>
        </div>

        <div className="d-flex align-items-center gap-1">
          <span
            className={`badge-tag ${
              userStrokeCount === kanji.kanji.strokes.count ? "jade" : "default"
            }`}>
            {userStrokeCount} / {kanji.kanji.strokes.count} strokes
          </span>
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

        {showGuide && (
          <div className="canvas-guide">
            {kanji.kanji.character}
          </div>
        )}

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
      </div>

      {/* Status Tip */}
      <div className="mt-3 small text-secondary">
        {userStrokeCount === kanji.kanji.strokes.count ? (
          <span className="text-success d-inline-flex align-items-center gap-1 fw-bold">
            <CheckCircle2 size={16} /> Perfect stroke count reached!
          </span>
        ) : (
          <span>
            Trace each stroke smoothly from top to bottom, left to right.
          </span>
        )}
      </div>
    </div>
  );
};
