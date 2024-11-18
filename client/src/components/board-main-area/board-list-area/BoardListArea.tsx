import React from "react";
import { boardListArea, boardListColumnsContainer } from "./styles.css";
import List from "../../list/List";

const BoardListArea: React.FC = () => {
  return (
    <div className={boardListArea}>
      <ol className={boardListColumnsContainer}>
        <List />
        <List />
      </ol>
    </div>
  );
};

export default BoardListArea;
