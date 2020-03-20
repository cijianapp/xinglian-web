import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";

import { baseURL } from "../../utils/http";

import { Post } from "../post";

export const Content = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(baseURL + "guest/homeposts", {
        cancelToken: source.token
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          let postList = [];
          response.data.forEach(element => {
            postList.push(<Post key={element._id} post={element}></Post>);
          });

          setPosts(postList);
        }
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  return <div className={styles.content}>{posts}</div>;
};
