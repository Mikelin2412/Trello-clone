import { useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { CardType, ItemTypes } from "../../types/types";
import { cardBlock, cardName, descriptionTitle } from "./styles.css";
import ModalWindow from "../modal-window/ModalWindow";
import { useAppDispatch } from "../../store/hooks";
import {
  changeCardsOrderValues,
  removeCard,
  updateCard,
} from "../../store/slices/listSlice";

interface Props {
  index: number;
  handleHoveredIndex: (hoveredIndex: number) => void;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const Card: React.FC<Props & Omit<CardType, "order">> = ({
  id,
  title,
  description,
  listId,
  index,
  handleHoveredIndex,
  moveCard,
}) => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const card = item as { id: number; index: number; listId: number };

      if (!ref.current) return;

      const dragIndex = card.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex && card.listId === listId) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset()!;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      if (card.listId === listId) {
        moveCard(dragIndex, hoverIndex);
        card.index = hoverIndex;
      } else {
        console.log(hoverIndex);
        handleHoveredIndex(hoverIndex);
      }
    },
    drop: () => dispatch(changeCardsOrderValues()),
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index, listId };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleSaveDescription = useCallback(
    (newTitle: string, newDescription: string) => {
      dispatch(
        updateCard({ cardId: id, title: newTitle, description: newDescription })
      );
      setModalOpen(false);
    },
    []
  );

  const handleDelete = useCallback(() => {
    dispatch(removeCard(id));
    setModalOpen(false);
  }, []);

  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId}>
      <div
        className={cardBlock}
        style={{ opacity: isDragging ? 0 : 1 }}
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
    </div>
  );
};

export default Card;
