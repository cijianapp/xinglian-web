import React from "react";
import styles from "./styles.module.css";

import { FiMessageCircle } from "react-icons/fi";

import { Vote } from "../collections";

export const Icons = ({ voteNumber }) => {
  return (
    <div className={styles.icons}>
      <FiMessageCircle size={20} style={{ padding: "5px" }}></FiMessageCircle>
      <div style={{ paddingRight: "5px" }}>0</div>

      <Vote voteNumber={voteNumber}></Vote>
    </div>
  );
};
