import React from "react";
import BoardHeader from "./board-header/BoardHeader";
import { boardMainContent } from "./styles.css";
import BoardListArea from "./board-list-area/BoardListArea";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const BoardMainArea: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={boardMainContent}>
        <BoardHeader />
        <BoardListArea />
      </div>
    </DndProvider>
  );
};

export default BoardMainArea;
