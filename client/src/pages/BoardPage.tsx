import React from "react";
import Header from "../components/header/Header";
import BoardMenu from "../components/board-menu/BoardMenu";
import BoardMainArea from "../components/board-main-area/BoardMainArea";

const BoardPage: React.FC = () => {
  return (
    <>
      <Header />
      <main style={{ display: "flex" }}>
        <BoardMenu />
        <BoardMainArea />
      </main>
    </>
  );
};

export default BoardPage;
