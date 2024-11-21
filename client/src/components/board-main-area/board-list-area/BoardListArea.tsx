import React, { useEffect, useState } from "react";
import {
  addListButton,
  boardListArea,
  boardListColumnsContainer,
  inputBlock,
  inputField,
  listItemBlock,
} from "./styles.css";
import List from "../../list/List";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addNewList,
  fetchListsForBoard,
  selectLists,
} from "../../../store/slices/listSlice";
import { getSelectedBoard } from "../../../store/slices/boardSlice";

const BoardListArea: React.FC = () => {
  const lists = useAppSelector(selectLists);
  const selectedBoard = useAppSelector(getSelectedBoard);
  const dispatch = useAppDispatch();

  const [newListTitle, setNewListTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (selectedBoard?.id) dispatch(fetchListsForBoard(selectedBoard.id));
  }, [selectedBoard?.id]);

  const handleAddList = () => {
    if (!newListTitle.trim()) return;
    dispatch(addNewList({ title: newListTitle, boardId: selectedBoard?.id! }));
    setNewListTitle("");
    setIsAdding(false);
  };

  return (
    <div className={boardListArea}>
      {selectedBoard?.id && (
        <ol className={boardListColumnsContainer}>
          {lists.map((list) => (
            <li key={list.id} className={listItemBlock}>
              <List id={list.id} title={list.title} cards={list.cards} />
            </li>
          ))}
          {!isAdding ? (
            <button className={addListButton} onClick={() => setIsAdding(true)}>
              + Add new list
            </button>
          ) : (
            <div className={inputBlock}>
              <input
                className={inputField}
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Enter list title"
              />
              <button className={addListButton} onClick={handleAddList}>
                Add List
              </button>
              <button
                className={addListButton}
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </ol>
      )}
    </div>
  );
};

export default BoardListArea;
