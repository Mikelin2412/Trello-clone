import React, { useEffect, useState } from "react";
import {
  actions,
  boardItem,
  boardList,
  boardTitle,
  cancelButton,
  createBoard,
  createButton,
  deleteButton,
  editButton,
  editWrapper,
  header,
  input,
  saveButton,
  selectedBoardItem,
  sidebar,
} from "./styles.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  removeBoard,
  editBoard,
  selectBoards,
  addBoard,
  fetchAllBoards,
  getSelectedBoard,
  setSelectedBoard,
} from "../../store/slices/boardSlice";

interface Board {
  id: number;
  title: string;
}

const BoardMenu: React.FC = () => {
  const { boards } = useAppSelector(selectBoards);
  const selectedBoard = useAppSelector(getSelectedBoard);
  const dispatch = useAppDispatch();
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editableBoard, setEditableBoard] = useState<{
    id: number;
    title: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, [dispatch])

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard: Board = {
      id: Date.now(),
      title: newBoardTitle,
    };

    dispatch(addBoard(newBoard.title));
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (id: number) => {
    dispatch(removeBoard(id));
  };

  const handleEditBoard = (id: number, newTitle: string) => {
    if (!newTitle.trim()) return;

    dispatch(editBoard({ id, title: newTitle }));
    setEditableBoard(null);
  };

  const handleSelectBoard = (board: Board) => {
    dispatch(setSelectedBoard(board));
  };

  return (
    <div className={sidebar}>
      <h2 className={header}>My Boards</h2>
      <div className={boardList}>
        {boards.map((board) => (
          <div
            key={board.id}
            className={`${boardItem} ${
              selectedBoard?.id === board.id ? selectedBoardItem : ""
            }`}
            onClick={() => handleSelectBoard(board)}
          >
            {editableBoard?.id === board.id ? (
              <div className={editWrapper}>
                <input
                  type="text"
                  value={editableBoard.title}
                  onChange={(e) =>
                    setEditableBoard({
                      ...editableBoard,
                      title: e.target.value,
                    })
                  }
                  className={input}
                />
                <button
                  className={saveButton}
                  onClick={() => handleEditBoard(board.id, editableBoard.title)}
                >
                  Save
                </button>
                <button
                  className={cancelButton}
                  onClick={() => setEditableBoard(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className={boardTitle}>{board.title}</span>
                <div className={actions}>
                  <button
                    className={editButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditableBoard({ id: board.id, title: board.title });
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className={deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBoard(board.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={createBoard}>
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="New board title"
          className={input}
        />
        <button className={createButton} onClick={handleCreateBoard}>
          +
        </button>
      </div>
    </div>
  );
};

export default BoardMenu;
