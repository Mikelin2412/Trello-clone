import React, { useCallback, useState } from "react";
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
  cardsContainer,
} from "./styles.css";
import { ItemTypes, ListType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addCardToList,
  moveCardToAnotherList,
  removeList,
  reorderCardsByHover,
  sendReorderedListsToApi,
  updateListTitle,
} from "../../store/slices/listSlice";
import Card from "../card/Card";
import { useDrop } from "react-dnd";
import { store } from "../../store/store";

const List: React.FC<Pick<ListType, "id" | "title" | "cards">> = ({ id }) => {
  const dispatch = useAppDispatch();
  const list = useAppSelector((state) =>
    state.lists.lists.find((list) => list.id === id)
  );
  const { title, cards } = list || { title: "", cards: [] };
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [hoveredCardIndex, setHoveredCardIndex] = useState(0);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (card: { id: number; index: number; listId: number }, _) => {
      if (card.listId !== id) {
        dispatch(
          moveCardToAnotherList({
            cardId: card.id,
            sourceListId: card.listId,
            targetListId: id,
            targetIndex: hoveredCardIndex,
          })
        );
      }
      const updatedLists = store.getState().lists.lists;
      dispatch(sendReorderedListsToApi(updatedLists));
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    dispatch(
      addCardToList({ title: newCardTitle, order: cards.length, listId: id })
    );
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

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(reorderCardsByHover({ dragIndex, hoverIndex, listId: id }));
  }, []);

  const handleHoveredCardIndex = useCallback((hoveredIndex: number) => {
    setHoveredCardIndex(hoveredIndex);
  }, []);

  return (
    <div className={listBody}>
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
      <div className={cardsContainer} ref={drop}>
        {cards?.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            description={card.description}
            listId={card.listId}
            index={index}
            handleHoveredIndex={handleHoveredCardIndex}
            moveCard={moveCard}
          />
        ))}
      </div>
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
