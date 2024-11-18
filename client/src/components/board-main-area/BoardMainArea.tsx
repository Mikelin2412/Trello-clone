import React from "react";
import BoardHeader from "./board-header/BoardHeader";
import { boardMainContent } from "./styles.css";
import BoardListArea from "./board-list-area/BoardListArea";

const BoardMainArea: React.FC = () => {
  return (
      <div className={boardMainContent}>
        <BoardHeader />
        <BoardListArea />
      </div>
  );
};

export default BoardMainArea;
