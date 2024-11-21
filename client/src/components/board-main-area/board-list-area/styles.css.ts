import { style } from "@vanilla-extract/css";

export const boardListArea = style({
  margin: "12px 0 12px 12px",
  flex: 1,
  position: "relative",
});

export const boardListColumnsContainer = style({
  margin: 0,
  padding: 0,
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  flexDirection: "row",
  listStyle: "none",
  height: "100%",
  overflowX: "auto",
  overflowY: "hidden",
  whiteSpace: "nowrap",
});

export const listItemBlock = style({
  width: "225px",
  padding: "0 6px 0 0",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
});

export const addListButton = style({
  alignSelf: 'flex-start',
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#ffffff3d",
  color: "white",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#b3b3b33d",
  },
});

export const inputBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const inputField = style({
  padding: "8px",
  fontSize: "1rem",
  border: "1px solid #dfe1e6",
  borderRadius: "12px",
});