import React from "react";

import { ossURL } from "../../utils/http";

export const Avatar = ({ url, size }) => {
  size = size.toString();
  const pxSize = size + "px";
  const viewBox = "0 0 " + size + " " + size;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={pxSize}
      height={pxSize}
    >
      <foreignObject
        mask={"url(#svg-mask-guilds-default)"}
        width={pxSize}
        height={pxSize}
      >
        <div width={pxSize} height={pxSize}></div>
        <img width={pxSize} height={pxSize} src={ossURL + url} alt="头像"></img>
      </foreignObject>
    </svg>
  );
};
