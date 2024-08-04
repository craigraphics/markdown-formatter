import { useState, useCallback, useEffect } from 'react';
import { applyFormatting } from '../utils/markdownHelper';

export const useMarkdownFormatter = () => {
  const [textArea, setTextArea] = useState<string>(() => {
    return localStorage.getItem('markdownContent') || '';
  });
  const [selection, setSelection] = useState({ start: 0, end: 0 });

  useEffect(() => {
    const saveInterval = setInterval(() => {
      localStorage.setItem('markdownContent', textArea);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(saveInterval);
  }, [textArea]);

  const handleSelect = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    setSelection({
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
    });
  }, []);

  const formatText = useCallback(
    (prefix: string, suffix: string = '', multiline: boolean = false) => {
      const newText = applyFormatting(textArea, selection, prefix, suffix, multiline);
      setTextArea(newText);
    },
    [textArea, selection]
  );

  const setTextBold = useCallback(() => formatText('**', '**'), [formatText]);
  const setTextItalic = useCallback(() => formatText('*', '*'), [formatText]);
  const setHeading = useCallback((level: number) => formatText('#'.repeat(level)), [formatText]);
  const setBlockquote = useCallback(() => formatText('> ', '', true), [formatText]);

  const setList = useCallback(() => {
    formatText('- ', '', true);
  }, [formatText]);

  const setCodeBlock = useCallback(() => {
    formatText('```\n', '\n```');
  }, [formatText]);

  const setLink = useCallback(() => {
    formatText('[', '](https://)');
  }, [formatText]);

  const setImage = useCallback(() => {
    formatText('![alt text](', ' "Image Title")');
  }, [formatText]);

  return {
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
  };
};
