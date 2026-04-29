import { useState, useEffect } from "react";

const TextViewer: React.FC<{ file: File }> = ({ file }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    file.text().then(setText);
  }, [file]);

  return (
    <pre className="whitespace-pre-wrap text-sm p-4 bg-white max-w-full">
      {text}
    </pre>
  );
};

export default TextViewer;