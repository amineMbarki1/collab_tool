import { useAppStore } from "@/hooks";

import { Avatar } from "@/components/Avatar";
import HomeIcon from "@/assets/icons/icon-home.svg?react";
import LightModeIcon from "@/assets/icons/icon-light-mode.svg?react";
import GroupIcon from "@/assets/icons/icon-group.svg?react";
import useDarkTheme from "@/hooks/useDarkTheme";
import styles from "./Sidebar.module.css";
import useUrlHash from "@/hooks/useUrlHash";
import { Notifications } from "@/features/notifications";
import MessageIcon from "@/assets/icons/icon-message.svg?react";
import MenuICon from "@/assets/icons/icon-menu.svg?react";
import { toggleSidesection } from ".";

export default function Sidebar() {
  const { dispatch, useAppSelector } = useAppStore();
  const { showSidesection } = useAppSelector((state) => state.sidesection);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsEnabled] = useDarkTheme();
  const hash = useUrlHash();

  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
          <li className={styles.menuItem} title="topics">
            <a
              onClick={() => dispatch(toggleSidesection())}
              className={`${styles.navLink} ${
                showSidesection ? styles.active : ""
              }`}
              
            >
              <MenuICon className={styles.icon} />
            </a>
          </li>
          <li title="topics">
            <a
              className={`${styles.navLink} ${
                hash === "" ? styles.active : ""
              }`}
              href="#"
            >
              <HomeIcon className={styles.icon} />
            </a>
          </li>

          <li title="team">
            <a
              className={`${styles.navLink}  ${
                hash === "#team" ? styles.active : ""
              }    `}
              href="#team"
            >
              <GroupIcon className={styles.icon} />
            </a>
          </li>
          <li title="messages">
            <a
              className={`${styles.navLink}  ${
                hash === "#messages" ? styles.active : ""
              }    `}
              href="#messages"
            >
              <MessageIcon className={styles.icon} />
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.bottomMenu}>
        <Notifications />
        <LightModeIcon
          onClick={() => setIsEnabled((prev) => !prev)}
          style={{ cursor: "pointer" }}
          className={styles.icon}
        />
        <Avatar />
      </div>
    </div>
  );
}
