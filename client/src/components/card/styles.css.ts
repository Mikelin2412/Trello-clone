import { style } from "@vanilla-extract/css";

export const cardBlock = style({
  minHeight: "36px",
  borderRadius: "8px",
  backgroundColor: "#22272b",
  color: "#b6c2cf",
  display: "flex",
  alignItems: "center",
});

export const cardName = style({
  flex: 1,
  margin: 0,
  padding: '0 8px',
  fontSize: '0.9rem',
  fontWeight: 'normal',
});
