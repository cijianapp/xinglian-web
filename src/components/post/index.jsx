import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

import { timeDiff } from "../../utils/calc";
import { Avatar } from "../collections";
import { Icons } from "./icons";

export const Post = ({ post }) => {
  let text = "";
  let imgURL = "";
  let videoURL = "";
  let time = timeDiff(post.time);

  let postType = "normal";

  if (Array.isArray(post.content))
    post.content.forEach(node => {
      if (node.type === "paragraph") {
        if (text === "" && node.children[0].hasOwnProperty("text")) {
          text = node.children[0].text;
        }
        if (imgURL === "" && node.children[0].type === "image") {
          imgURL = node.children[0].url;
        }
      }
      if (node.type === "image") {
        if (imgURL === "") {
          imgURL = node.url;
        }
      }

      if (node.type === "video") {
        if (videoURL === "") {
          videoURL = node.url;
          postType = "video";
        }
      }
    });

  let media = <img className={styles.media} alt="" src={imgURL}></img>;

  if (postType === "video") {
    media = <video controls className={styles.media} src={videoURL}></video>;
  }

  return (
    <Link to={"/" + post.guild + "/" + post._id}>
      <div className={styles.post}>
        {media}
        <div className={styles.textContainer}>
          <h3>{post.title}</h3>
          <div className={styles.text}>{text}</div>
        </div>

        <div className={styles.infoWrapper}>
          <Avatar size={32} url={post.useravatar}></Avatar>

          <div className={styles.userInfo}>
            <div className={styles.username}>{post.username}</div>
            <div className={styles.timeInfo}>
              {time}
              <span className={styles.guildInfo}>{post.guildname}</span>
            </div>
          </div>

          <Icons voteNumber={post.vote}></Icons>
        </div>
      </div>
    </Link>
  );
};
