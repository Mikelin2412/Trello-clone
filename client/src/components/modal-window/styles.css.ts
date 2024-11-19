import { style } from "@vanilla-extract/css";

export const modalOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const editCardTitle = style({
  margin: 0,
  marginBottom: "12px",
});

export const modalContent = style({
  background: "#22272b",
  padding: "20px",
  borderRadius: "8px",
  width: "400px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
});

export const cardTitleBlock = style({
  color: "white",
});

export const editTitleContainer = style({
  marginBottom: "12px",
});

export const titleInputField = style({
  backgroundColor: "#22272b",
  color: "white",
  border: "1px solid #696969",
  borderRadius: "12px",
  padding: "10px",
  fontSize: "1rem",
  resize: "none",
});

export const inputField = style({
  width: "100%",
  minHeight: "50px",
  backgroundColor: "#22272b",
  color: "white",
  border: "1px solid #696969",
  borderRadius: "12px",
  padding: "10px",
  fontSize: "1rem",
  resize: "none",
});

export const descriptionContainer = style({
  display: "flex",
  flexWrap: "wrap",
});

export const buttonsContainer = style({
  display: "flex",
  justifyContent: "space-between",
});

export const saveButton = style({
  marginTop: "10px",
  padding: "10px 15px",
  backgroundColor: "#0079bf45",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
});

export const deleteButton = style({
  marginTop: "10px",
  padding: "10px 15px",
  backgroundColor: "#bf000045",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
});

export const cancelButton = style({
  marginTop: "10px",
  padding: "10px 15px",
  backgroundColor: "#ffffff45",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
});
