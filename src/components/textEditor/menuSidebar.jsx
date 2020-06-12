import React, { useRef, useEffect } from "react";
import styles from "./menuSidebar.module.css";
import { useSlate, ReactEditor } from "slate-react";
import { FiXCircle, FiCamera, FiVideo } from "react-icons/fi";

import { Portal } from "./components";
import { insertMedia } from "./insertFunctions";
import {
  blogOptionVisibilitySelector,
  submitActions
} from "../../reducer/submitSlice";
import { useDispatch, useSelector } from "react-redux";

export const MenuSidebar = () => {
  const ref = useRef();
  const imageInput = useRef();
  const videoInput = useRef();
  const editor = useSlate();
  const dispatch = useDispatch();
  const blogOptionVisibility = useSelector(blogOptionVisibilitySelector);

  useEffect(() => {
    const el = ref.current;
    const { selection, children } = editor;

    console.log();
    if (!el) {
      return;
    }

    if (!selection || !ReactEditor.isFocused(editor)) {
      el.removeAttribute("style");
      return;
    }

    if (
      ["image-mid", "image-left"].includes(
        children[selection.anchor.path[0]].type
      )
    ) {
      el.removeAttribute("style");
      return;
    }

    if (children[selection.anchor.path[0]].children[0].text !== "") {
      el.removeAttribute("style");
      return;
    }

    function handleResize() {
      const domSelection = window.getSelection();
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();

      el.style.opacity = 1;
      el.style.top = `${rect.top +
        window.pageYOffset -
        el.offsetHeight / 2 +
        18}px`;
      el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth -
        2 +
        rect.width / 2}px`;
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <Portal>
      <div
        ref={ref}
        className={styles.menu}
        onMouseDown={e => {
          e.stopPropagation();
          e.preventDefault();
          dispatch(submitActions.setBlogOptionVisibility("visible"));
        }}
      >
        <FiXCircle
          size={32}
          strokeWidth={1}
          className={styles.icon}
        ></FiXCircle>
        <div
          style={{
            visibility: blogOptionVisibility,
            position: "absolute",
            left: "24px",
            display: "flex",
            alignContent: "center",
            backgroundColor: "#fff"
          }}
        >
          <FiCamera
            size={20}
            strokeWidth={1}
            style={{ margin: "5px 10px 5px 10px" }}
            onClick={() => {
              imageInput.current.click();
            }}
          ></FiCamera>
          <FiVideo
            size={20}
            strokeWidth={1}
            style={{ margin: "5px 5px 5px 0px" }}
            onClick={() => {
              videoInput.current.click();
            }}
          ></FiVideo>
        </div>
      </div>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        ref={imageInput}
        className={styles.inputFile}
        onChange={() => {
          handleFile(imageInput, editor);
        }}
      ></input>

      <input
        type="file"
        accept=".mp4"
        ref={videoInput}
        className={styles.inputFile}
        onChange={() => {
          handleFile(videoInput, editor);
        }}
      ></input>
    </Portal>
  );
};

function handleFile(fileInput, editor) {
  try {
    const file = fileInput.current.files[0];

    console.log(file);

    if (file.type === "video/mp4") {
      let fileURL = window.URL.createObjectURL(file);
      insertMedia(editor, file, fileURL, "video");
    } else {
      const reader = new FileReader();
      reader.onloadend = function() {
        insertMedia(editor, file, reader.result, "image");
      };
      reader.readAsDataURL(file);
    }
  } catch (error) {
    console.error(error);
  }
}

export default MenuSidebar;
