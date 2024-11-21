import React, { useState } from "react";
import {
  header,
  logButton,
  trelloLogo,
  headerContainer,
} from "./styles.css.ts";
import ActivityLog from "../activity-logs/ActivityLogs.tsx";
import { useAppSelector } from "../../store/hooks.ts";
import { getSelectedBoard } from "../../store/slices/boardSlice.ts";

const Header: React.FC = () => {
  const selectedBoard = useAppSelector(getSelectedBoard);
  const [isLogVisible, setLogVisible] = useState(false);

  const toggleLogVisibility = () => setLogVisible((prev) => !prev);

  return (
    <header className={header}>
      <div className={headerContainer}>
        <img
          className={trelloLogo}
          src="https://trello.com/assets/87e1af770a49ce8e84e3.gif"
          alt="logo"
        />
        <button className={logButton} onClick={toggleLogVisibility}>
          Activity Log
        </button>
        {selectedBoard?.id && (
          <ActivityLog
            boardId={selectedBoard?.id}
            isVisible={isLogVisible}
            onClose={() => setLogVisible(false)}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
