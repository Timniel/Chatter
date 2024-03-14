import * as React from "react";

const Counter = (props) => {
  // const [num, setNum] = React.useState(props.config.start);

  const handleVideoUpload = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const videoURL = reader.result; // base64 encoded URL from the FileReader
          // Insert video markdown (though markdown doesn't officially support videos, this is a pseudo-syntax)
          const markdown = `<video width="320" height="240" controls> <source src="${videoURL}" type="video/mp4"> </video>`;
          // console.log(markdown);
          props.editor.insertText(markdown);
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }
    };
  };

  // const handleClick = () => {
  //   // 调用API，往编辑器中插入一个数字
  //   props.editor.insertText(num);
  //   // 更新一下自身的state
  //   setNum(num + 1);
  // };

  return (
    <span
      className="button button-type-counter"
      title="Counter"
      onClick={handleVideoUpload}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path
            fill="currentColor"
            d="M12 2c5.523 0 10 4.477 10 10a9.985 9.985 0 0 1-3.999 8H20a1 1 0 1 1 0 2h-8C6.477 22 2 17.523 2 12S6.477 2 12 2m0 12a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4-4a2 2 0 1 0 0 4a2 2 0 0 0 0-4m8 0a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-4-4a2 2 0 1 0 0 4a2 2 0 0 0 0-4"
          />
        </g>
      </svg>
    </span>
  );
};
// 如果需要的话，可以在这里定义默认选项
Counter.defaultConfig = {
  start: 1,
};
Counter.align = "left";
Counter.pluginName = "my-counter-b";

export default Counter;