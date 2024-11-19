import React, { useState } from "react";
import {
  modalOverlay,
  modalContent,
  titleInputField,
  inputField,
  saveButton,
  descriptionContainer,
  deleteButton,
  cancelButton,
  editTitleContainer,
  buttonsContainer,
  editCardTitle,
} from "./styles.css";

interface ModalWindowProps {
  cardTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  onDelete: () => void;
  initialDescription?: string;
}

const ModalWindow: React.FC<ModalWindowProps> = ({
  cardTitle,
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialDescription,
}) => {
  const [title, setTitle] = useState(cardTitle);
  const [description, setDescription] = useState(initialDescription || "");

  if (!isOpen) return null;

  return (
    <div className={modalOverlay} onClick={onClose}>
      <div className={modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 className={editCardTitle}>Edit Card</h3>
        <div className={editTitleContainer}>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={titleInputField}
          />
        </div>
        <div className={descriptionContainer}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputField}
          />
        </div>
        <div className={buttonsContainer}>
          <button
            className={saveButton}
            onClick={() => onSave(title, description)}
          >
            Save
          </button>
          <button className={deleteButton} onClick={onDelete}>
            Delete
          </button>
          <button className={cancelButton} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
