import React from "react";
import styles from "./styles.module.css";

import { Content } from "./content";
import { Sidebar } from "./sidebar";

export const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <Content type="home"></Content>
      <Sidebar type="home"></Sidebar>
    </div>
  );
};
