import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchActivityLogs, selectAllLogs } from "../../store/slices/userLogSlice";
import { logMenu, logMenuClose, logMenuOpen, overlay } from "./styles.css.ts";

const ActivityLog: React.FC<{
  boardId: number;
  isVisible: boolean;
  onClose: () => void;
}> = ({ boardId, isVisible, onClose }) => {
  const dispatch = useAppDispatch();
  const { logs, loading } = useAppSelector(selectAllLogs);

  useEffect(() => {
    if (isVisible) dispatch(fetchActivityLogs(boardId));
  }, [boardId, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div className={overlay} onClick={onClose}></div>
      <div className={`${logMenu} ${isVisible ? logMenuOpen : logMenuClose}`}>
        <h3>Activity Log</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {logs.map((log) => (
              <li key={log.id}>
                {log.action} – {new Date(log.createdAt).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ActivityLog;
