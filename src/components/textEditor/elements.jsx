import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  useSelected,
  useFocused,
  useSlate,
  ReactEditor,
  useEditor
} from "slate-react";
import { Editor, Transforms } from "slate";
import ReactTooltip from "react-tooltip";
import { v4 } from "uuid";
import Axios from "axios";
import { useSelector } from "react-redux";
import { Line } from "rc-progress";

import { headerConfigSelector } from "../../reducer/userSlice";
import { Menu, Button } from "./components";
import { FiTrash2, FiChevronsUp, FiChevronsDown } from "react-icons/fi";
import { baseURL, ossURL } from "../../utils/http";

export const MediaElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const headerConfig = useSelector(headerConfigSelector);
  const [progress, setProgress] = useState(0);
  const selected = useSelected();
  const focused = useFocused();

  let ifSelected = selected && focused;

  let ImageStyle = styles.image;

  if (selected && focused) {
    ImageStyle = styles.imageSelected;
  }

  useEffect(() => {
    function uploadFile(file) {
      let formData = new FormData();

      formData.append("file", file);

      Axios.post(baseURL + "api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headerConfig
        },
        // cancelToken: source.token,
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );

          setProgress(percentCompleted);
        }
      })
        .then(res => {
          const path = ReactEditor.findPath(editor, element);
          Transforms.setNodes(
            editor,
            { url: ossURL + res.data, file: "" },
            { at: path }
          );
          console.log(res);
        })
        .catch(err => console.log(err));
    }

    if (element.file !== "") uploadFile(element.file);

    return () => {};
  }, [element, headerConfig, editor]);

  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className={styles.imageContainer}
        onDragStart={e => {
          e.preventDefault();
          return false;
        }}
      >
        {ifSelected && (
          <div className={styles.imageMenuContainer}>
            <Menu className={styles.imageMenu}>
              <TrashButton element={element} icon="format_trash" />
              <TrashButton element={element} icon="format_up" />
              <TrashButton element={element} icon="format_down" />
            </Menu>
          </div>
        )}

        {element.type === "image" && (
          <img alt="" src={element.url} className={ImageStyle} />
        )}

        {element.type === "video" && (
          <video className={ImageStyle} controls>
            <source src={element.url} type="video/mp4"></source>
          </video>
        )}

        {element.file !== "" && (
          <Line percent={progress} strokeWidth="1" strokeLinecap="butt" />
        )}
      </div>

      {children}
    </div>
  );
};

export const toggleImage = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return !!match;
};

const TrashButton = ({ element, icon }) => {
  const editor = useSlate();

  if (icon === "format_trash")
    return (
      <Button
        onMouseDown={() => {
          const path = ReactEditor.findPath(editor, element);
          Transforms.removeNodes(editor, { at: path });
        }}
      >
        <FiTrash2 size={18} strokeWidth={3} />
      </Button>
    );

  if (icon === "format_up")
    return (
      <Button
        onMouseDown={() => {
          const path = ReactEditor.findPath(editor, element);
          if (path[0] === 0) return;
          const toPath = [path[0] - 1];
          Transforms.moveNodes(editor, { at: path, to: toPath });
        }}
      >
        <FiChevronsUp size={21} strokeWidth={3} />
      </Button>
    );

  if (icon === "format_down")
    return (
      <Button
        onMouseDown={() => {
          const path = ReactEditor.findPath(editor, element);
          if (path[0] === editor.children.length - 1) return;
          const toPath = [path[0] + 1];
          Transforms.moveNodes(editor, { at: path, to: toPath });

          if (path[0] === editor.children.length - 2) {
            const text = { type: "paragraph", children: [{ text: "" }] };

            Transforms.insertNodes(editor, text);
          }
        }}
      >
        <FiChevronsDown size={20} strokeWidth={3} />
      </Button>
    );
};

export const LinkElement = ({ attributes, children, element }) => {
  const id = v4();

  return (
    <span className={styles.link} {...attributes} data-tip data-for={id}>
      <ReactTooltip
        place="bottom"
        id={id}
        effect="solid"
        delayHide={500}
        className={styles.toolTips}
        contentEditable={false}
        clickable={true}
      >
        <div
          className={styles.dirty}
          onMouseDown={e => {
            alert("zxxx");
            e.stopPropagation();
          }}
        ></div>

        <a
          className={styles.linkContainer}
          href={element.url}
          target="_blank"
          rel="noopener noreferrer"
          contentEditable={false}
        >
          {element.url}
        </a>
      </ReactTooltip>

      {children}
    </span>
  );
};
