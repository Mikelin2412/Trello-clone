import React from "react";
import { boardHeader, boardHeaderTitle } from "./styles.css";
import { useAppSelector } from "../../../store/hooks";
import { selectBoards } from "../../../store/slices/boardSlice";

const BoardHeader: React.FC = () => {
  const { selectedBoard } = useAppSelector(selectBoards);

  return (
    <div className={boardHeader}>
      <h3 className={boardHeaderTitle}>
        {selectedBoard?.title || "Board title"}
      </h3>
    </div>
  );
};

export default BoardHeader;
