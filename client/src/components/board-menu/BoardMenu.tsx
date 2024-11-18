import React, { useState } from "react";
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
  sidebar,
} from "./styles.css";

interface Board {
  id: number;
  title: string;
}

const BoardMenu: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: "First Board",
    },
    {
      id: 2,
      title: "Second Board",
    },
    {
      id: 3,
      title: "Third Board",
    },
  ]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [editBoard, setEditBoard] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const handleCreateBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard: Board = {
      id: Date.now(),
      title: newBoardTitle,
    };

    setBoards([...boards, newBoard]);
    setNewBoardTitle("");
  };

  const handleDeleteBoard = (id: number) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  const handleEditBoard = (id: number, newTitle: string) => {
    setBoards(
      boards.map((board) =>
        board.id === id ? { ...board, title: newTitle } : board
      )
    );
    setEditBoard(null);
  };

  return (
    <div className={sidebar}>
      <h2 className={header}>My Boards</h2>
      <div className={boardList}>
        {boards.map((board) => (
          <div key={board.id} className={boardItem}>
            {editBoard?.id === board.id ? (
              <div className={editWrapper}>
                <input
                  type="text"
                  value={editBoard.title}
                  onChange={(e) =>
                    setEditBoard({ ...editBoard, title: e.target.value })
                  }
                  className={input}
                />
                <button
                  className={saveButton}
                  onClick={() => handleEditBoard(board.id, editBoard.title)}
                >
                  Save
                </button>
                <button
                  className={cancelButton}
                  onClick={() => setEditBoard(null)}
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
                    onClick={() =>
                      setEditBoard({ id: board.id, title: board.title })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className={deleteButton}
                    onClick={() => handleDeleteBoard(board.id)}
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
