import React, { useState } from "react";
import {
  listBody,
  listFooter,
  listHeader,
  listTitle,
  addNewCardButton,
  listDeleteButton,
  listEditButton,
  listEditInput,
  listButtonsContainer,
} from "./styles.css";
import CardsContainer from "../cards-container/CardsContainer";
import { useDrag } from "react-dnd";
import { ItemTypes, ListType } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import {
  addCardToList,
  removeList,
  updateListTitle,
} from "../../store/slices/listSlice";

const List: React.FC<Pick<ListType, "id" | "title" | "cards">> = ({
  id,
  title,
  cards,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCardTitle, setNewCardTitle] = useState("");
  const dispatch = useAppDispatch();

  const [_, drag] = useDrag(() => ({
    type: ItemTypes.LIST,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    dispatch(addCardToList({ title: newCardTitle, listId: id }));
    setNewCardTitle("");
  };

  const handleDeleteList = () => {
    dispatch(removeList(id));
  };

  const handleUpdateTitle = () => {
    if (!newTitle.trim() || newTitle === title) {
      setIsEditing(false);
      return;
    }
    dispatch(updateListTitle({ id, title: newTitle }));
    setIsEditing(false);
  };

  return (
    <div className={listBody} ref={drag}>
      <div className={listHeader}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className={listEditInput}
            />
            <div className={listButtonsContainer}>
              <button onClick={handleUpdateTitle} className={listEditButton}>
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className={listEditButton}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h5 className={listTitle}>{title}</h5>
            <div className={listButtonsContainer}>
              <button
                onClick={() => setIsEditing(true)}
                className={listEditButton}
              >
                Edit
              </button>
              <button onClick={handleDeleteList} className={listDeleteButton}>
                Delete
              </button>
            </div>
          </>
        )}
      </div>
      <CardsContainer id={id} cards={cards} />
      <div className={listFooter}>
        <input
          type="text"
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="New card title"
          className={listEditInput}
        />
        <button onClick={handleAddCard} className={addNewCardButton}>
          Add new card
        </button>
      </div>
    </div>
  );
};

export default List;
