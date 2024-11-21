import React, { ReactNode } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import { CardType, ItemTypes } from "../../../types/types";

interface DropWrapperProps {
  onDrop: (item: CardType, monitor: DropTargetMonitor, listId: number) => void;
  children: ReactNode;
  listId: number;
}

const DropWrapper: React.FC<DropWrapperProps> = ({
  onDrop,
  children,
  listId,
}) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (card: CardType, monitor) => {
      onDrop(card, monitor, listId);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={"drop-wrapper"}>
      {React.cloneElement(children as React.ReactElement)}
    </div>
  );
};

export default DropWrapper;
