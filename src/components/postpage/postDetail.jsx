import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./styles.module.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { baseURL } from "../../utils/http";
import { timeDiff } from "../../utils/calc";
import { Avatar } from "../collections";

export const PostDetail = () => {
  const [post, setPost] = useState({});
  const [value, setValue] = useState(initialValue);

  const { postID } = useParams();
  let time = timeDiff(post.time);

  const editor = useMemo(() => withReact(createEditor()), []);

  useEffect(() => {
    const source = Axios.CancelToken.source();

    const getConfig = { withCredentials: true, params: { post: postID } };
    Axios.get(baseURL + "guest/post", getConfig)
      .then(response => {
        setPost(response.data);
        setValue(response.data.content);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, [postID]);

  const renderElement = useCallback(({ attributes, children, element }) => {
    switch (element.type) {
      case "paragraph":
        return (
          <p className={styles.p} {...attributes}>
            {children}
          </p>
        );

      case "image":
        return (
          <div className={styles.mediaContainer}>
            <img
              alt=""
              src={element.url}
              className={styles.image}
              {...attributes}
            ></img>
          </div>
        );

      case "video":
        return (
          <div className={styles.mediaContainer}>
            <video
              className={styles.video}
              src={element.url}
              controls
              {...attributes}
            ></video>
          </div>
        );

      case "quote":
        return <blockquote {...attributes}>{children}</blockquote>;
      case "link":
        return (
          <a {...attributes} href={element.url}>
            {children}
          </a>
        );
      default:
        return <p {...attributes}>{children}</p>;
    }
  }, []);

  return (
    <div className={styles.postDetail}>
      <h2>{post.title}</h2>
      <div style={{ display: "flex" }}>
        <Avatar size={48} url={post.useravatar}></Avatar>

        <div style={{ marginLeft: "10px" }}>
          <div>{post.username}</div>
          <div>
            {time}
            <span>{post.guildname}</span>
          </div>
        </div>
      </div>

      <Slate editor={editor} value={value}>
        <Editable readOnly renderElement={renderElement} />
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
