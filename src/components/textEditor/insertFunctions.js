import { Transforms, Editor, Range } from "slate";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

export const insertMedia = (editor, file, media_url, type) => {
  const text = { type: "paragraph", children: [{ text: "" }] };

  let media = {};

  if (type === "video")
    media = {
      type: "video",
      url: media_url,
      caption: "",
      children: [{ text: "" }],
      file: file
    };
  else
    media = {
      type: "image",
      url: media_url,
      caption: "",
      children: [{ text: "" }],
      file: file
    };

  Transforms.removeNodes(editor, editor.selection);

  Transforms.insertNodes(editor, media, {
    voids: true
  });

  Transforms.insertNodes(editor, text);

  Transforms.select(editor, [editor.selection.anchor.path[0] - 1, 0]);
};

export const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === "link" });
  return !!link;
};

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === "link" });
};

export const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};
