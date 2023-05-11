import React, { useRef } from 'react';
import FormattedText from './formattedText';

const Article = ({ htmlContent }) => {
  const articleRef = useRef();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(articleRef.current.innerText);
      alert('Text copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  

  return (
    <div>
      <button onClick={copyToClipboard} className="your-button-classes">
        Copy to Clipboard
      </button>
      <div
        ref={articleRef}
        className="border-white border m-10 items-center rounded-md p-10"
      >
        <span className="text-lg p-20">
          <FormattedText text={blogData?.content || ''} />
        </span>
      </div>
    </div>
  );
};

export default Article;
