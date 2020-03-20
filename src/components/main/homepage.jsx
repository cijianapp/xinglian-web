import React from "react";
import styles from "./styles.module.css";

import { Content } from "./content";
import { Sidebar } from "./sidebar";

export const Homepage = () => {
  return (
    <div className={styles.homepage}>
      <Content></Content>
      <Sidebar></Sidebar>
    </div>
  );
};
