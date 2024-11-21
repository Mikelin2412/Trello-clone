import React, { useEffect, useState } from "react";
import { cardsContainer } from "./styles.css";
import { CardType, ListType } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchCardsForList } from "../../store/slices/cardSlice";
import DropWrapper from "./drop-wrapper/DropWrapper";
import { changeCardsOrder, selectLists } from "../../store/slices/listSlice";
import { DropTargetMonitor } from "react-dnd";
import Card from "./card/Card";

const CardsContainer: React.FC<Pick<ListType, "id" | "cards">> = ({
  id,
  cards,
}) => {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [dragIndex, setDragIndex] = useState(0);
  const dispatch = useAppDispatch();
  const lists = useAppSelector(selectLists);

  useEffect(() => {
    dispatch(fetchCardsForList(id));
  }, [dispatch]);

  const onDrop = (
    card: CardType,
    monitor: DropTargetMonitor,
    targetListId: number
  ) => {
    const sourceList = lists.find((list) =>
      list.cards.some((c) => c.id === card.id)
    );

    if (!sourceList) return;

    const targetList = lists.find((list) => list.id === targetListId);

    if (!targetList) return;

    // Определение индекса в целевом списке
    // const hoverIndex = targetList.cards.length;
    console.log('drag: ' + dragIndex);
    console.log('hover:' + hoverIndex);

    dispatch(
      changeCardsOrder({
        cardId: card.id,
        sourceListId: sourceList.id,
        targetListId,
        targetOrder: hoverIndex,
      })
    );
  };

  const handleHoverIndex = (draggableIndex: number, hovIndex: number) => {
    setHoverIndex(hovIndex);
    setDragIndex(draggableIndex);
  };

  return (
    <DropWrapper onDrop={onDrop} listId={id}>
      <div className={cardsContainer}>
        {cards?.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            listId={id}
            order={card.order}
            title={card.title}
            description={card.description}
            cards={cards}
            handleHoverIndex={handleHoverIndex}
          />
        ))}
      </div>
    </DropWrapper>
  );
};

export default CardsContainer;
