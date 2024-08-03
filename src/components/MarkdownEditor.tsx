import React from 'react';
import FormatButton from './presentational/FormatButton';
import { useMarkdownFormatter } from '../hooks/useMarkdownFormatter';

import { FaBold, FaItalic, FaHeading, FaQuoteRight, FaListUl, FaCode, FaLink, FaImage } from 'react-icons/fa';

interface MarkdownEditorProps {
  onTextChange: (text: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ onTextChange }) => {
  const {
    textArea,
    setTextArea,
    handleSelect,
    setTextBold,
    setTextItalic,
    setHeading,
    setBlockquote,
    setList,
    setCodeBlock,
    setLink,
    setImage,
  } = useMarkdownFormatter();

  React.useEffect(() => {
    onTextChange(textArea);
  }, [textArea, onTextChange]);

  return (
    <div className="flex flex-col">
      <div className="mb-2 w-full border-gray-300 dark:border-gray-600 border p-2 shadow-lg">
        <div className="flex flex-wrap gap-2">
          <FormatButton onClick={setTextBold} icon={<FaBold />} />
          <FormatButton onClick={setTextItalic} icon={<FaItalic />} />
          <FormatButton onClick={() => setHeading(1)} icon={<FaHeading />} text="1" />
          <FormatButton onClick={() => setHeading(2)} icon={<FaHeading />} text="2" />
          <FormatButton onClick={() => setHeading(3)} icon={<FaHeading />} text="3" />
          <FormatButton onClick={setBlockquote} icon={<FaQuoteRight />} />
          <FormatButton onClick={setList} icon={<FaListUl />} />
          <FormatButton onClick={setCodeBlock} icon={<FaCode />} />
          <FormatButton onClick={setLink} icon={<FaLink />} />
          <FormatButton onClick={setImage} icon={<FaImage />} />
        </div>
      </div>

      <textarea
        className="flex-grow w-full p-4 min-h-[200px] bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 focus:bg-white dark:focus:bg-gray-900 focus:shadow-lg transition-all duration-200 resize-none"
        value={textArea}
        placeholder="Enter your markdown text here"
        onChange={(e) => setTextArea(e.target.value)}
        onSelect={handleSelect}
      ></textarea>
    </div>
  );
};

export default MarkdownEditor;
