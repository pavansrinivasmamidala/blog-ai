import React, { useRef, useState } from "react";

const CodeBlock = ({ code }) => {
  const codeRef = useRef();
  const [codeText, setCodeText] = useState("Copy");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);

      setCodeText("Copied");
      setInterval(() => {
        setCodeText("Copy");
      }, 4000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative bg-black rounded-md">
      <pre
        ref={codeRef}
        className=" text-white px-2 py-2 mx-2 my-4 whitespace-pre-wrap overflow-x-auto "
      >
        {code}
      </pre>
      <button
        onClick={copyToClipboard}
        className="text-white right-2 absolute top-2 flex items-center "
      >
        <svg
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>

        <span
          className="animated-gradient-text font-semibold"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #FFB3BA, #FFDFBA, #FFFFBA, #BAFFC9, #BAE1FF)",
          }}
        >
          {codeText}
        </span>
      </button>
    </div>
  );
};

export default CodeBlock;
