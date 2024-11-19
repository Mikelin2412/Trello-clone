import React, { useState } from "react";
import { cardBlock, cardName, descriptionTitle } from "./styles.css";
import { useDrag } from "react-dnd";
import { CardType, ItemTypes } from "../../../types/types";
import ModalWindow from "../../modal-window/ModalWindow";
import { useAppDispatch } from "../../../store/hooks";
import { removeCard, updateCard } from "../../../store/slices/cardSlice";

const Card: React.FC<Omit<CardType, "listId">> = ({
  id,
  title,
  description,
}) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [_, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleSaveDescription = (newTitle: string, newDescription: string) => {
    dispatch(updateCard({ id, title: newTitle, description: newDescription }));
    setModalOpen(false);
  };

  const handleDelete = () => {
    dispatch(removeCard(id));
    setModalOpen(false);
  };

  return (
    <>
      <div className={cardBlock} ref={drag} onClick={() => setModalOpen(true)}>
        <h5 className={cardName}>{title}</h5>
        {description && (
          <h5 className={descriptionTitle}>{description}</h5>
        )}
      </div>
      <ModalWindow
        cardTitle={title}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDescription}
        onDelete={handleDelete}
        initialDescription={description}
      />
    </>
  );
};

export default Card;
