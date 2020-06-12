import React, { useMemo, useState, useCallback } from "react";
import styles from "./styles.module.css";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

import { HoveringToolbar, Element, Leaf, toggleMark } from "./hoveringToolbar";
import { MenuSidebar } from "./menuSidebar";
import { withMedia, withMarkdown, withLinks } from "./withFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  blogOptionVisibilitySelector,
  submitActions
} from "../../reducer/submitSlice";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code"
};

export const TextEditor = () => {
  const editor = useMemo(
    () =>
      withHistory(
        withLinks(withMarkdown(withMedia(withReact(createEditor()))))
      ),
    []
  );

  const [value, setValue] = useState(initialValue);
  const dispatch = useDispatch();
  const blogOptionVisibility = useSelector(blogOptionVisibilitySelector);

  const renderElement = useCallback(props => <Element {...props} />, []);

  return (
    <div
      style={{ position: "relative" }}
      onMouseDown={e => {
        if (blogOptionVisibility === "visible")
          dispatch(submitActions.setBlogOptionVisibility("hidden"));
      }}
    >
      <Slate editor={editor} value={value} onChange={value => setValue(value)}>
        <HoveringToolbar />
        <MenuSidebar />

        <Editable
          placeholder="说说你的故事吧…"
          className={styles.container}
          renderLeaf={props => <Leaf {...props} />}
          renderElement={renderElement}
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Slate>
    </div>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: ""
      }
    ]
  }
];
