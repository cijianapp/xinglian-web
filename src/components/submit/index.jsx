import React, { useState } from "react";
import styles from "./styles.module.css";
import commonStyles from "../../utils/styles.module.css";
import TextareaAutosize from "react-autosize-textarea";
import { useSelector, useDispatch } from "react-redux";

import { ImageElement } from "./imageElement";
import { VideoElement } from "./videoElement";
import { Blog } from "./blog";
import { optionSelector } from "../../reducer/submitSlice";
import { loggedSelector, authActions } from "../../reducer/authSlice";

export const Submit = () => {
  const option = useSelector(optionSelector);
  const logged = useSelector(loggedSelector);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  let buttonStyle = { opacity: 0.2, cursor: "not-allowed" };

  if (logged && title !== "") {
    buttonStyle = {};
  }

  return (
    <div
      className={styles.submit}
      onClick={e => {
        if (!logged) {
          dispatch(authActions.toLogin(true));
          e.preventDefault();
        }
      }}
    >
      <TextareaAutosize
        rows={1}
        placeholder="标题"
        className={commonStyles.textarea_normal}
        value={title}
        onChange={e => {
          setTitle(e.target.value);
        }}
      ></TextareaAutosize>
      {option === "blog" && <Blog></Blog>}
      {option === "image" && <ImageElement></ImageElement>}
      {option === "video" && <VideoElement></VideoElement>}

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <button
            type="button"
            disabled
            className={commonStyles.button_common}
            style={{ height: "32px", ...buttonStyle }}
          >
            发布
          </button>
        </div>
      </div>
    </div>
  );
};
