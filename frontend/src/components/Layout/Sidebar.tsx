import { Avatar } from "@/components/Avatar";
import HomeIcon from "@/assets/icons/icon-home.svg?react";
import LightModeIcon from "@/assets/icons/icon-light-mode.svg?react";
import GroupIcon from "@/assets/icons/icon-group.svg?react";
import useDarkTheme from "@/hooks/useDarkTheme";
import styles from "./Sidebar.module.css";
import useUrlHash from "@/hooks/useUrlHash";
import { Notifications } from "@/features/notifications";

export default function Sidebar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsEnabled] = useDarkTheme();
  const hash = useUrlHash() as "#team" | "";

  return (
    <div className={styles.sidebar}>
      <nav>
        <ul>
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
          {/* <li title="messages">
            <a className={styles.navLink} href="#messages">
              <MessageIcon className={styles.icon} />
            </a>
          </li> */}
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
