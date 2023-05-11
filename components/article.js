import React, { useRef } from "react";
import FormattedText from "./formattedText";

const Article = ({ htmlContent }) => {
  const articleRef = useRef();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleRef.current.innerText);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div >
      <button
        onClick={copyToClipboard}
        className="border-2 flex justify-end items-center text-end self-end px-4 py-2 rounded-lg border-black "
      >
        Copy to Clipboard
      </button>
      <div
        ref={articleRef}
        className="border-white border m-10 items-center rounded-md p-10"
      >
        <span className="text-lg p-20">
          <FormattedText text={htmlContent || ""} />
        </span>
      </div>
    </div>
  );
};

export default Article;
