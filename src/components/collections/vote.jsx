import React from "react";
import styles from "./styles.module.css";

import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

export const Vote = ({ voteNumber }) => {
  return (
    <div className={styles.vote}>
      <FiThumbsUp size={18} style={{ padding: "5px" }}></FiThumbsUp>
      <div>{voteNumber}</div>
      <FiThumbsDown size={18} style={{ padding: "5px" }}></FiThumbsDown>
    </div>
  );
};
