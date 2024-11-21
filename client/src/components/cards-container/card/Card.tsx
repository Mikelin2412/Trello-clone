import React, { useRef, useState } from "react";
import { cardBlock, cardName, descriptionTitle } from "./styles.css";
import { useDrag, useDrop } from "react-dnd";
import { CardType, ItemTypes } from "../../../types/types";
import ModalWindow from "../../modal-window/ModalWindow";
import { useAppDispatch } from "../../../store/hooks";
import { removeCard, updateCard } from "../../../store/slices/cardSlice";

const Card: React.FC<
  CardType & {
    cards: CardType[];
    handleHoverIndex: (dragIndex: number, hoverIndex: number) => void;
  }
> = ({ id, title, order, listId, description, handleHoverIndex }) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    hover(draggedCard: CardType, monitor) {
      if (!ref.current) return;

      const dragIndex = draggedCard.order;
      const hoverIndex = order;

      if (dragIndex === hoverIndex) return;

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset()!;
      const hoverClientY = mousePosition?.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) return;

      handleHoverIndex(dragIndex, hoverIndex);
      draggedCard.order = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, listId, title, description, order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
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

  drag(drop(ref));

  return (
    <>
      <div
        className={cardBlock}
        style={{ opacity: isDragging ? 0 : 1 }}
        ref={ref}
        onClick={() => setModalOpen(true)}
      >
        <h5 className={cardName}>{title}</h5>
        {description && <h5 className={descriptionTitle}>{description}</h5>}
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
