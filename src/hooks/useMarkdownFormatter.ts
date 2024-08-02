// src/hooks/useMarkdownFormatter.ts

import { useState, useCallback, useEffect } from 'react';

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

  const applyFormatting = useCallback(
    (prefix: string, suffix: string = '', multiline: boolean = false) => {
      let start = selection.start;
      let end = selection.end;
      let selectedText = textArea.substring(start, end);
      let newText = selectedText;

      if (multiline) {
        // Expand selection to include entire lines
        while (start > 0 && textArea[start - 1] !== '\n') {
          start--;
        }
        while (end < textArea.length && textArea[end] !== '\n') {
          end++;
        }
        selectedText = textArea.substring(start, end);
      }

      // Remove existing formatting if present
      if (prefix.startsWith('#')) {
        // For headings, remove any existing heading
        if (/^#{1,6}\s/.test(selectedText)) {
          newText = selectedText.replace(/^#{1,6}\s/, '');
        } else {
          newText = prefix + ' ' + selectedText.trim();
        }
      } else if (prefix === '> ') {
        // For blockquotes
        if (selectedText.startsWith('> ')) {
          newText = selectedText.replace(/^> /gm, '');
        } else {
          newText = selectedText
            .split('\n')
            .map((line) => '> ' + line)
            .join('\n');
        }
      } else if (selectedText.startsWith(prefix) && selectedText.endsWith(suffix)) {
        newText = selectedText.slice(prefix.length, -suffix.length);
      } else {
        // Apply new formatting
        newText = prefix + selectedText + suffix;
      }

      const updatedText = textArea.substring(0, start) + newText + textArea.substring(end);

      setTextArea(updatedText);
    },
    [textArea, selection]
  );

  const setTextBold = useCallback(() => applyFormatting('**', '**'), [applyFormatting]);
  const setTextItalic = useCallback(() => applyFormatting('*', '*'), [applyFormatting]);
  const setHeading = useCallback((level: number) => applyFormatting('#'.repeat(level)), [applyFormatting]);
  const setBlockquote = useCallback(() => applyFormatting('> ', '', true), [applyFormatting]);

  return {
    textArea,
    setTextArea,
    handleSelect,
    setTextBold,
    setTextItalic,
    setHeading,
    setBlockquote,
  };
};
