import React from "react";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "./codeblock";

const FormattedText = ({ text }) => {
  let inPreTag = false; // Flag to track if we're inside a <pre> tag

  const options = {
    replace: ({ attribs, children, name }) => {
      if (name === "h1") {
        return (
          <span className="text-3xl font-bold mb-4 flex items-center justify-center" >
            {domToReact(children, options)}
          </span>
        );
      }

      if (name === "h2") {
        return (
          <span className="text-xl font-bold flex items-center">
            {domToReact(children, options)}
          </span>
        );
      }

      if (name === "p") {
        return <p className="my-8 text-lg">{domToReact(children, options)}</p>;
      }

      if (name === "pre") {
        inPreTag = true; // Set flag to true when we encounter a <pre> tag
        const preContent = <pre>{domToReact(children, options)}</pre>;
        inPreTag = false; // Reset flag after processing children
        return preContent;
      }

      if (name === "code") {
        if (inPreTag) {
          // If code tag is inside a pre tag
          return <CodeBlock code={domToReact(children, options)} />;
        } else {
          // If code tag is inside a p tag or some other tag
          return <code className="bg-black rounded-md px-3 py-[2px] text-white">{domToReact(children, options)}</code>;
        }
      }

      // if (name === "code") {
      //   return <CodeBlock code={domToReact(children, options)} />;
      // }
    },
  };

  return <div>{parse(text, options)}</div>;
};

export default FormattedText;
