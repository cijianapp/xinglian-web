import React from "react";
import styles from "./styles.module.css";

import { Content } from "./content";
import { Sidebar } from "./sidebar";

export const Guildpage = () => {
  return (
    <div className={styles.homepage}>
      <Content type="guild"></Content>
      <Sidebar type="guild"></Sidebar>
    </div>
  );
};
