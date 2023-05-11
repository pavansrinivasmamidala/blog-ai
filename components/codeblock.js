import React, { useRef } from 'react';

const CodeBlock = ({ code }) => {
  const codeRef = useRef();
  

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeRef.current.textContent);
      alert('Code copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div className="code-block-container">
      <pre ref={codeRef} className="code-block">
        {code}
      </pre>
      <button onClick={copyToClipboard} className="your-copy-button-classes">
        Copy Code
      </button>
    </div>
  );
};

export default CodeBlock;
