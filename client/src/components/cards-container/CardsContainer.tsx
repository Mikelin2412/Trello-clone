import React, { useEffect } from "react";
import { cardsContainer } from "./styles.css";
import Card from "./card/Card";
import { useDrop } from "react-dnd";
import { ItemTypes, ListType } from "../../types/types";
import { useAppDispatch } from "../../store/hooks";
import { fetchCardsForList } from "../../store/slices/cardSlice";

const CardsContainer: React.FC<Pick<ListType, "id" | "cards">> = ({
  id,
  cards,
}) => {
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  useEffect(() => {
    dispatch(fetchCardsForList(id));
  }, [dispatch]);

  return (
    <div className={cardsContainer} ref={drop}>
      {cards?.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          description={card.description}
        />
      ))}
      {isOver && (
        <div
          style={{
            width: "100%",
            height: "50px",
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: "yellow",
          }}
        />
      )}
    </div>
  );
};

export default CardsContainer;
