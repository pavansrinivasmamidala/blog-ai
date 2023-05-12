import React, { useRef, useState } from "react";
import FormattedText from "./formattedText";
import Link from "next/link";

const Article = ({ htmlContent }) => {
  const articleRef = useRef();
  const [copyText, setCopyText] = useState("Copy to Clipboard");

  const copyToClipboard = async () => {
    try {
      let articleText = articleRef.current.innerText;
      // Split the article text by line, filter out lines that only contain the word "Copy", and join them back
      const filteredText = articleText
        .split("\n")
        .filter((line) => !/^Copy$/.test(line.trim()))
        .join("\n");

      await navigator.clipboard.writeText(filteredText);
      setCopyText("Copied to Clipboard");

      setInterval(() => {
        setCopyText("Copy to Clipboard");
      }, 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="container relative">
      <Link href="/create-blog" className="border-2 absolute left-2  px-3 py-1 rounded-lg border-black "> 
      <span
          className="animated-gradient-text-copy text-xl font-bold"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
          }}
        >
          Create a New Blog
        </span>
      </Link>
      <button
        onClick={copyToClipboard}
        className="border-2 absolute right-2  px-3 py-1 rounded-lg border-black "
      >
        <span
          className="animated-gradient-text-copy text-xl font-bold"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #007cf0, #00dfd8, #7928ca, #ff0080, #ff4d4d, #f9cb28)",
          }}
        >
          {copyText}
        </span>
      </button>
      <div
        ref={articleRef}
        className="border-white border mx-10 items-center rounded-md p-10"
      >
        <span className="text-lg p-20">
          <FormattedText text={htmlContent || ""} />
        </span>
      </div>
    </div>
  );
};

export default Article;
