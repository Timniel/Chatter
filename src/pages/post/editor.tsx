import ReactQuill, { Quill } from "react-quill";
import "./css/quill.snow.css";

import QuillToggleFullscreenButton from "quill-toggle-fullscreen-button";
import ImageCompress from "quill-image-compress";

Quill.register("modules/toggleFullscreen", QuillToggleFullscreenButton);
Quill.register("modules/imageCompress", ImageCompress);
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Blog } from "../../shared/interface";

interface EditorProps {
  toolbar?: boolean;
  setValue: UseFormSetValue<Blog>;
  register: UseFormRegister<Blog>;
}

var icons = ReactQuill.Quill.import("ui/icons");

icons["undo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;
icons["redo"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
    <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
  </svg>`;

const Editor = ({ toolbar = true, setValue, register }: EditorProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    register("content", { required: true });
  }, []);
  const editorRef = useRef<ReactQuill>(null);
  function undoChange() {
    const quillEditor = editorRef.current?.getEditor() as any;
    quillEditor?.history?.undo();
  }

  function redoChange() {
    const quillEditor = editorRef.current?.getEditor() as any;
    quillEditor?.history?.redo();
  }

  const toolbarOptions = useMemo(
    () => ({
      container: [
        ["undo", "redo"],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],

        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        [{ font: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["image", "video"], // Add 'emoji' to your toolbar
      ],
      handlers: {
        undo: undoChange.bind(this), // use .bind to ensure 'this' refers to the component instance
        redo: redoChange.bind(this),
      },
    }),
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: toolbarOptions,
      history: {
        delay: 2000,
        maxStack: 500,
        userOnly: true,
      },

      imageCompress: {
        quality: 1, // default
        maxWidth: 1000, // default
        maxHeight: 1000, // default
        imageType: "image/png",
        debug: false, // default
        suppressErrorLogging: true, // default
      },

      // toggleFullscreen: true,
      toggleFullscreen: {
        buttonTitle: "Toggle fullscreen",
        buttonHTML: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M18.5 5.5H16a1.5 1.5 0 0 1 0-3h3A2.5 2.5 0 0 1 21.5 5v3a1.5 1.5 0 0 1-3 0zM8 5.5H5.5V8a1.5 1.5 0 1 1-3 0V5A2.5 2.5 0 0 1 5 2.5h3a1.5 1.5 0 1 1 0 3m0 13H5.5V16a1.5 1.5 0 0 0-3 0v3A2.5 2.5 0 0 0 5 21.5h3a1.5 1.5 0 0 0 0-3m8 0h2.5V16a1.5 1.5 0 0 1 3 0v3a2.5 2.5 0 0 1-2.5 2.5h-3a1.5 1.5 0 0 1 0-3"/></g></svg>`,
      },
    }),
    []
  );
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "align",
    "font",
    "script",
    "color",
    "background",
    "link",
    "image",
    "clean",
  ];

  const toggleFullScreen = (e: any) => {
    e.preventDefault();
    setIsFullScreen(!isFullScreen);
  };

  const exitFullscreenButton = (
    <button
      onClick={toggleFullScreen}
      className="absolute z-50 p-2 text-sm text-white bg-blue-700 rounded top-1 hover:bg-blue-700 focus:outline-none right-4"
    >
      Exit Fullscreen
    </button>
  );

  return (
    <>
      {/* Button to toggle fullscreen */}
      <button
        onClick={toggleFullScreen}
        className="hidden p-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>

      <div
        className={`${
          isFullScreen ? "fixed inset-0 z-[10000] h-full bg-white" : "h-full"
        }`}
      >
        {isFullScreen && exitFullscreenButton}
        <ReactQuill
          ref={editorRef}
          theme="snow"
          modules={toolbar ? modules : { toolbar: false }}
          formats={formats}
          className={` text-[#444] rounded-xl shadow-sm ${
            isFullScreen ? "h-screen" : "h-full overflow-hidden"
          } `}
          placeholder="Write something awesome..."
          onChange={(content) => setValue("content", content)}
        />
      </div>
    </>
  );
};

Editor.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  readOnly: PropTypes.bool,
  toolbar: PropTypes.bool,
};

export default Editor;
