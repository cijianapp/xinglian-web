import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

import { baseURL } from "../../utils/http";
import { Post } from "../post";
import { SubmitOptions } from "./submitOptions";
import { loggedSelector } from "../../reducer/authSlice";
import { headerConfigSelector } from "../../reducer/userSlice";
import { useParams } from "react-router-dom";

export const Content = ({ type }) => {
  const [posts, setPosts] = useState([]);
  const { guildID } = useParams();

  const logged = useSelector(loggedSelector);
  const headerConfig = useSelector(headerConfigSelector);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getConfig = {
      params: {
        guild: guildID
      }
    };

    if (type === "guild") {
      axios
        .get(baseURL + "guest/posts", getConfig)
        .then(response => {
          let postElements = [];

          if (response.data !== null) {
            response.data.forEach(element => {
              postElements.push(<Post key={element._id} post={element}></Post>);
            });
          }

          setPosts(postElements);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      if (logged) {
        axios
          .get(baseURL + "api/homeposts", {
            headers: headerConfig,
            cancelToken: source.token
          })
          .then(response => {
            if (response.data !== null) {
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
      } else {
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
      }
    }

    return () => {
      source.cancel();
    };
  }, [type, logged, headerConfig, guildID]);

  return (
    <div className={styles.content}>
      <SubmitOptions></SubmitOptions>
      {posts}
    </div>
  );
};
