import React from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";

import { submitActions, blogSelector } from "../../reducer/submitSlice";
import { ImageElement } from "./imageElement";
import { useState } from "react";

import { TextEditor } from "../textEditor";

export const Blog = () => {
  return (
    <div>
      <TextEditor></TextEditor>
    </div>
  );
};

export const Blog1 = () => {
  const blog = useSelector(blogSelector);

  let elementList = [];

  blog.forEach((element, index) => {
    if (element.type === "image") {
      elementList.push(
        <ElementWithOptions key={index} index={index}></ElementWithOptions>
      );
    }
  });

  return (
    <div>
      {elementList}
      <NextElement></NextElement>
    </div>
  );
};

export const NextElement = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.nextElement}>
      <div> 添加一个模块</div>
      <div>
        <button
          onClick={() => {
            dispatch(submitActions.addElement({ type: "image", value: "" }));
          }}
        >
          图片
        </button>
      </div>
    </div>
  );
};

export const ElementWithOptions = ({ index }) => {
  const [optionVisibility, setOptionVisibility] = useState("hidden");
  const dispatch = useDispatch();

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={e => setOptionVisibility("visible")}
      onMouseLeave={e => setOptionVisibility("hidden")}
    >
      <ImageElement index={index}></ImageElement>
      <div
        style={{
          position: "absolute",
          bottom: "0",
          right: 0,
          visibility: optionVisibility
        }}
      >
        <button
          onClick={e => {
            alert(index);
            dispatch(submitActions.removeElement(index));
          }}
        >
          删除
        </button>
      </div>
    </div>
  );
};
