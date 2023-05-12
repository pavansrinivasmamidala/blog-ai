import React from "react";
import parse, { domToReact } from "html-react-parser";
import CodeBlock from "./codeblock";

const FormattedText = ({ text }) => {
  let inPreTag = false; 

  const options = {
    replace: ({ attribs, children, name }) => {
      if (name === "h1") {
        return (
          <span className="text-3xl font-bold mb-4 flex items-center justify-center" >
            {domToReact(children, options)}
          </span>
        );
      }

      if (name === "h2" || name === "h3" || name === "h4" ) {
        return (
          <span className="text-xl font-bold mt-4 flex items-center">
            {domToReact(children, options)}
          </span>
        );
      }

      if (name === "p") {
        return <p className="my-6 text-lg">{domToReact(children, options)}</p>;
      }

      if (name === "pre") {
        inPreTag = true; 
        const preContent = <pre>{domToReact(children, options)}</pre>;
        inPreTag = false; 
        return preContent;
      }

      if (name === "code") {
        if (inPreTag) {
          return <CodeBlock code={domToReact(children, options)} />;
        } else {
          return <code className="bg-black rounded-md px-3 py-[2px] text-white">{domToReact(children, options)}</code>;
        }
      }
    },
  };

  return <div>{parse(text, options)}</div>;
};

export default FormattedText;
