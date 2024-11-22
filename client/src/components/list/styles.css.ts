import { style } from "@vanilla-extract/css";

export const listBody = style({
  color: "#b6c2cf",
  backgroundColor: "#101204",
  borderRadius: "12px",
  display: "flex",
  flexDirection: "column",
  padding: "0 8px",
  maxHeight: "100%",
});

export const listHeader = style({
  padding: "8px 8px 0 8px",
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "8px",
});

export const listTitle = style({
  width: "100%",
  margin: 0,
  padding: "6px 8px 6px 4px",
  fontSize: "1rem",
});

export const listFooter = style({
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  gap: "8px",
});

export const addNewCardButton = style({
  flex: 1,
  backgroundColor: "#22272b",
  borderRadius: "8px",
  border: "none",
  color: "white",
  padding: "8px",
  cursor: "pointer",
});

export const listEditInput = style({
  flex: 1,
  backgroundColor: "#22272b",
  padding: "8px",
  fontSize: "1rem",
  border: "none",
  color: "#b6c2cf",
  borderRadius: "4px",
});

export const listButtonsContainer = style({
  display: "flex",
  justifyContent: "flex-start",
  gap: "8px",
});

export const listEditButton = style({
  padding: "4px 8px",
  backgroundColor: "#22272b",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#026aa7",
  },
});

export const listDeleteButton = style({
  padding: "4px 8px",
  backgroundColor: "#ff563030",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  ":hover": {
    backgroundColor: "#bf2600",
  },
});

export const cardsContainer = style({
  margin: "12px 0",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  overflowY: "scroll",
});
