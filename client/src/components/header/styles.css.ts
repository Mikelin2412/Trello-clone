import { style } from "@vanilla-extract/css";

export const header = style({
  width: "100vw",
  backgroundColor: "#1d2125",
  borderBottomWidth: 1,
  borderBottomColor: "#9fadbc29",
});

export const logButton = style({
  padding: 12,
  borderRadius: 5,
  border: "none",
  backgroundColor: "#579dff",
  cursor: "pointer",
});

export const headerContainer = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 8,
});

export const trelloLogo = style({
  width: 100,
  filter:
    "brightness(0) saturate(100%) invert(66%) sepia(20%) saturate(225%) hue-rotate(170deg) brightness(101%) contrast(85%);",
});
