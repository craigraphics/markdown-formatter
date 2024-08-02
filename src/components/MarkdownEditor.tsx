import React from 'react';
import FormatButton from './presentational/FormatButton';
import { useMarkdownFormatter } from '../hooks/useMarkdownFormatter';

interface MarkdownEditorProps {
  onTextChange: (text: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onTextChange }) => {
  const { textArea, setTextArea, handleSelect, setTextBold, setTextItalic, setHeading, setBlockquote } =
    useMarkdownFormatter();

  React.useEffect(() => {
    onTextChange(textArea);
  }, [textArea, onTextChange]);

  return (
    <div className="flex flex-col">
      <div className="mmb-2 w-full border-gray-300 dark:border-gray-600 border  p-2 shadow-lg">
        <div className="flex flex-wrap gap-2">
          <FormatButton onClick={setTextBold} text="B" />
          <FormatButton onClick={setTextItalic} text="I" />
          <FormatButton onClick={() => setHeading(1)} text="H1" />
          <FormatButton onClick={() => setHeading(2)} text="H2" />
          <FormatButton onClick={() => setHeading(3)} text="H3" />
          <FormatButton onClick={() => setHeading(4)} text="H4" />
          <FormatButton onClick={() => setHeading(5)} text="H5" />
          <FormatButton onClick={setBlockquote} text="Cite" />
        </div>
      </div>

      <textarea
        className=" flex-grow w-full p-4 min-h-[200px] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 flex-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        value={textArea}
        placeholder="Enter your markdown text here"
        onChange={(e) => setTextArea(e.target.value)}
        onSelect={handleSelect}
      ></textarea>
    </div>
  );
};

export default MarkdownEditor;
