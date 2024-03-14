// import react, react-markdown-editor-lite, and a markdown parser you like
import React from "react";
import * as ReactDOM from "react-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Editor from "react-markdown-editor-lite";
import MyCounterB, { Counter } from "./MyCounterB";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

Editor.use(MyCounterB, {});

function onImageUpload(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (data) => {
      resolve(data.target.result);
    };
    reader.readAsDataURL(file);
  });
}
export default (props) => {
  return (
    <>
      <MdEditor
        onImageUpload={onImageUpload}
        className="h-full"
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={onImageUpload}
      />
    </>
  );
};
