import React from "react";
import { boardHeader, boardHeaderTitle } from "./styles.css";

const BoardHeader: React.FC = () => {
  return (
    <div className={boardHeader}>
      <h3 className={boardHeaderTitle}>Board Header</h3>
    </div>
  );
};

export default BoardHeader;
