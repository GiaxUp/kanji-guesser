import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "vermilion" | "gold" | "jade" | "indigo" | "default";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = "",
}) => {
  return (
    <span
      className={`badge-tag ${variant} ${className}`}
      style={{
        fontSize: size === "sm" ? "0.7rem" : "0.8rem",
        padding: size === "sm" ? "0.15rem 0.5rem" : "0.25rem 0.65rem",
      }}>
      {children}
    </span>
  );
};
