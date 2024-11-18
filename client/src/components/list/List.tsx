import React from "react";
import {
  listItemBlock,
  listBody,
  listFooter,
  listHeader,
  listTitle,
  addNewCardButton,
} from "./styles.css";
import Card from "../card/Card";

const List: React.FC = () => {
  return (
    <li className={listItemBlock}>
      <div className={listBody}>
        <div className={listHeader}>
          <h5 className={listTitle}>Name of the list</h5>
        </div>
        <Card />
        <div className={listFooter}>
          <button className={addNewCardButton}>Add new card</button>
        </div>
      </div>
    </li>
  );
};

export default List;
