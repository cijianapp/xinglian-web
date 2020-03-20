import React from "react";
import styles from "./styles.module.css";

import { PostDetail } from "./postDetail";

export const Postpage = () => {
  return (
    <div className={styles.postpage}>
      <PostDetail></PostDetail>
    </div>
  );
};
