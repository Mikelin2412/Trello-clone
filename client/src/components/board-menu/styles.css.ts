import { style } from "@vanilla-extract/css";

export const sidebar = style({
  width: "225px",
  backgroundColor: "#14191c",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "1px 0px 0px 0px rgb(159 173 188 / 16%)",
  height: "calc(100vh - 56px - 32px)",
});

export const header = style({
  fontSize: "1.15rem",
  fontWeight: "bold",
  margin: 0,
  marginBottom: "16px",
  color: "#9fadbc",
});

export const boardList = style({
  flexGrow: 1,
  overflowY: "auto",
});

export const boardItem = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "8px",
  backgroundColor: "inherit",
  borderTop: "1px solid #626262",
  color: "#9fadbc",
});

export const boardTitle = style({
  fontSize: "1rem",
  color: "#9fadbc",
});

export const actions = style({
  display: "flex",
  gap: "8px",
});

export const buttonBase = style({
  fontSize: "0.9rem",
  padding: "4px 8px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});

export const editButton = style([
  buttonBase,
  {
    backgroundColor: "#68778782",
    color: "white",
  },
]);

export const deleteButton = style([
  buttonBase,
  {
    backgroundColor: "#b6462d70",
    color: "white",
  },
]);

export const saveButton = style([
  buttonBase,
  {
    backgroundColor: "#4bffb361",
    color: "white",
  },
]);

export const cancelButton = style([
  buttonBase,
  {
    backgroundColor: "#ffffff4d",
    color: "#fff",
  },
]);

export const createBoard = style({
  marginTop: "16px",
  display: "flex",
  gap: "8px",
});

export const input = style({
  flex: 1,
  padding: "6px",
  fontSize: "1rem",
  border: "1px solid #738496",
  borderRadius: "4px",
  backgroundColor: "#22272b",
  color: "#9fadbc",
  selectors: {
    "&:focus": {
      border: "1px solid #738496",
      backgroundColor: "transparent",
      color: "#9fadbc",
      outline: "none",
    },
  },
});

export const editWrapper = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

export const createButton = style({
  backgroundColor: "#0052cc",
  color: "white",
  padding: "0px 8px",
  fontSize: "1.5rem",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
});
