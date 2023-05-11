import React from 'react';
import parse, { domToReact } from 'html-react-parser';
import CodeBlock from './codeblock';

const FormattedText = ({ text }) => {
  const options = {
    replace: ({ attribs, children, name }) => {
      if (name === 'code') {
        return <CodeBlock code={domToReact(children)} />;
      }
    },
  };

  return <div>{parse(text, options)}</div>;
};

export default FormattedText;
