import React, { useState } from "react";
import { Volume2 } from "lucide-react";
import { audioService } from "../../services/audioService";

interface AudioButtonProps {
  audioUrl?: string;
  textToSpeak?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "ghost" | "gold" | "vermilion";
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  audioUrl,
  textToSpeak,
  label,
  size = "md",
  className = "",
  variant = "gold",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    await audioService.playPronunciation(
      audioUrl,
      textToSpeak,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "vermilion":
        return {
          background: isPlaying ? "rgba(230, 57, 70, 0.3)" : "rgba(230, 57, 70, 0.12)",
          border: "1px solid rgba(230, 57, 70, 0.4)",
          color: "#ff8b94",
        };
      case "ghost":
        return {
          background: "transparent",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          color: "var(--text-secondary)",
        };
      case "gold":
      default:
        return {
          background: isPlaying ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0.12)",
          border: "1px solid rgba(245, 158, 11, 0.35)",
          color: "var(--accent-gold)",
        };
    }
  };

  const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;
  const padding = size === "sm" ? "0.2rem 0.5rem" : size === "lg" ? "0.5rem 1rem" : "0.35rem 0.75rem";
  const fontSize = size === "sm" ? "0.75rem" : size === "lg" ? "0.95rem" : "0.85rem";

  return (
    <button
      onClick={handleClick}
      disabled={isPlaying}
      className={`btn d-inline-flex align-items-center gap-2 rounded-pill transition-all ${className}`}
      style={{
        ...getVariantStyles(),
        padding,
        fontSize,
        cursor: isPlaying ? "wait" : "pointer",
        transition: "all 0.2s ease",
      }}
      title={`Listen to Japanese pronunciation${textToSpeak ? ` for ${textToSpeak}` : ""}`}>
      {isPlaying ? (
        <div className="d-flex align-items-center gap-1" style={{ height: `${iconSize}px` }}>
          <div className="sound-wave-bar" style={{ height: "10px" }} />
          <div className="sound-wave-bar" style={{ height: "14px" }} />
          <div className="sound-wave-bar" style={{ height: "8px" }} />
        </div>
      ) : (
        <Volume2 size={iconSize} />
      )}
      {label && <span className="fw-medium">{label}</span>}
    </button>
  );
};
