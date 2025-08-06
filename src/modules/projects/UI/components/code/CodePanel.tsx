import React from "react";
import { useEffect, useRef } from "react";
import "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "./code-theme.css";
import Prism from "prismjs";

interface Props {
  code: string;
  lang: string;
}

const CodePanel = ({ code, lang }: Props) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, lang]);

return (
  <pre style={{scrollbarWidth:"none"}} className="p-2 bg-transparent border-none rounded-none m-0 text-xs h-full max-h-full overflow-y-auto">
    <code ref={codeRef} className={`language-${lang} block`}>
      {code}
    </code>
  </pre>
);


};

export default CodePanel;
