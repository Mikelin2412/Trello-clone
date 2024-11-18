import React from "react";
import { cardBlock, cardName } from "./styles.css";

const Card: React.FC = () => {
  return (
    <div className={cardBlock}>
      <h5 className={cardName}>Card Name</h5>
    </div>
  );
};

export default Card;
