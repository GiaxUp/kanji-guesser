import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Navbar as BsNavbar, Nav, Badge } from "react-bootstrap";
import { Flame, Volume2, VolumeX, Sparkles, BookOpen, BookmarkCheck, History as HistoryIcon, PenTool, Search } from "lucide-react";
import { useKanji } from "../../context/KanjiContext";
import { audioService } from "../../services/audioService";

export const Navbar: React.FC = () => {
  const { streak, savedKanji, soundEnabled, toggleSound } = useKanji();
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false);
    audioService.playClickSound();
  };

  return (
    <BsNavbar
      expand="lg"
      expanded={expanded}
      className="navbar-dark sticky-top py-3"
      style={{
        background: "rgba(9, 13, 22, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      }}>
      <Container>
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 text-decoration-none"
          onClick={handleLinkClick}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #e63946, #b5179e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(230, 57, 70, 0.4)",
            }}>
            <span style={{ fontFamily: "var(--font-kanji)", fontSize: "1.4rem", color: "#fff", fontWeight: "bold" }}>
              漢
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.5px", color: "#fff" }}>
              Kanji<span style={{ color: "var(--accent-vermilion)" }}>Guesser</span>
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                display: "block",
                color: "var(--accent-gold)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginTop: "-3px",
              }}>
              v2.0 • 漢字マスター
            </span>
          </div>
        </Link>

        {/* Mobile toggle button */}
        <BsNavbar.Toggle
          aria-controls="main-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        />

        <BsNavbar.Collapse id="main-navbar-nav">
          {/* Main Navigation Links */}
          <Nav className="mx-auto gap-1 my-2 my-lg-0">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-white text-dark fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <Sparkles size={16} /> Home
            </NavLink>

            <NavLink
              to="/learn"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-danger text-white fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <BookOpen size={16} /> Learn & Guess
            </NavLink>

            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-warning text-dark fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <PenTool size={16} /> Stroke Practice
            </NavLink>

            <NavLink
              to="/review"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 position-relative ${
                  isActive
                    ? "bg-primary text-white fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <BookmarkCheck size={16} /> Review Vault
              {savedKanji.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  style={{ fontSize: "0.7rem", marginLeft: "4px" }}>
                  {savedKanji.length}
                </Badge>
              )}
            </NavLink>

            <NavLink
              to="/dictionary"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-secondary text-white fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <Search size={16} /> Explorer
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) =>
                `nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${
                  isActive
                    ? "bg-info text-dark fw-bold shadow-sm"
                    : "text-secondary hover-text-white"
                }`
              }
              onClick={handleLinkClick}>
              <HistoryIcon size={16} /> History & Feedback
            </NavLink>
          </Nav>

          {/* Header Action Badges & Audio Switcher */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            {/* Streak Counter */}
            <div
              className="d-flex align-items-center gap-1 px-3 py-1 rounded-pill"
              style={{
                background: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.3)",
                color: "var(--accent-gold)",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
              title="Consecutive correct answer streak!">
              <Flame size={18} color="var(--accent-gold)" />
              <span>{streak}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                audioService.playClickSound();
                toggleSound();
              }}
              className="btn btn-sm d-flex align-items-center justify-content-center"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                background: soundEnabled ? "rgba(255,255,255,0.08)" : "rgba(230,57,70,0.15)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: soundEnabled ? "var(--text-primary)" : "var(--accent-vermilion)",
              }}
              title={soundEnabled ? "Mute sound effects" : "Enable sound effects"}>
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};
