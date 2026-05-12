import { useState, useEffect } from "react";

const TextViewer: React.FC<{ file: File }> = ({ file }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    file.text().then(setText);
  }, [file]);

  return (
    <pre className="m-0 min-h-full w-full overflow-auto whitespace-pre-wrap rounded-xl border border-white/15 bg-white/5 p-4 font-mono text-sm text-white">
      {text}
    </pre>
  );
};

export default TextViewer;
