import React from "react";
import {
  header,
  logButton,
  trelloLogo,
  headerContainer,
} from "./styles.css.ts";

const Header: React.FC = () => {
  return (
    <header className={header}>
      <div className={headerContainer}>
        <img
          className={trelloLogo}
          src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
          alt="logo"
        />
        <button className={logButton}>Activity Log</button>
      </div>
    </header>
  );
};

export default Header;
