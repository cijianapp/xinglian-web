import React from "react";
import styles from "./styles.module.css";

import { FiHome } from "react-icons/fi";

export const GuildList = () => {
  return (
    <div className={styles.guildList}>
      <Guild></Guild>
    </div>
  );
};

export const Guild = () => {
  return (
    <div className={styles.guild}>
      <FiHome></FiHome>
      主页
    </div>
  );
};
