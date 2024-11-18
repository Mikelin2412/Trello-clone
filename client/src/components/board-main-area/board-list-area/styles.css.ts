import { style } from "@vanilla-extract/css";

export const boardListArea = style({
  margin: "12px 0 12px 12px",
  backgroundColor: "rgb(0, 0, 0, 0.5)",
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
