import { style } from "@vanilla-extract/css";

export const listItemBlock = style({
  width: "225px",
  padding: "0 6px 0 0",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
});

export const listBody = style({
  color: "#b6c2cf",
  backgroundColor: "#101204",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  padding: "0 8px",
});

export const listHeader = style({
  padding: "8px 8px 0 8px",
});

export const listTitle = style({
  margin: 0,
  padding: "6px 8px 6px 4px",
  fontSize: "1rem",
});

export const listFooter = style({
  padding: "8px",
  display: "flex",
  justifyContent: "center",
});

export const addNewCardButton = style({
  backgroundColor: "#22272b",
  borderRadius: "8px",
  border: "none",
  color: "white",
  padding: "8px",
  cursor: "pointer",
});
