import { keyframes, style } from "@vanilla-extract/css";

const slideIn = keyframes({
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0)" },
});

const slideOut = keyframes({
  from: { transform: "translateX(0)" },
  to: { transform: "translateX(100%)" },
});

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
});

export const logMenuOpen = style({
  animation: `${slideIn} 0.3s forwards`,
});

export const logMenuClose = style({
  animation: `${slideOut} 0.3s forwards`,
});

export const logMenu = style({
  position: "fixed",
  top: 0,
  right: 0,
  width: "300px",
  height: "100%",
  backgroundColor: "#0f1012ed",
  color: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  overflowY: "auto",
  zIndex: 1001,
  display: "flex",
  flexDirection: "column",
  padding: "16px",
  transform: "translateX(100%)",
});
