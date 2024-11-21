import { style } from "@vanilla-extract/css";

export const cardBlock = style({
  minHeight: "36px",
  borderRadius: "8px",
  backgroundColor: "#22272b",
  color: "#b6c2cf",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  overflow: "hidden",
});

export const cardName = style({
  margin: 0,
  padding: "8px",
  fontSize: "1.05rem",
  whiteSpace: "normal",
  wordBreak: "break-word",
});

export const descriptionTitle = style({
  margin: 0,
  padding: "8px",
  fontSize: "0.9rem",
  fontWeight: "normal",
  backgroundColor: "#1b2025",
  whiteSpace: "normal",
  wordBreak: "break-word",
});
