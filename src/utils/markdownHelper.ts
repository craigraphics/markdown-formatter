interface Selection {
  start: number;
  end: number;
}

export const applyFormatting = (
  text: string,
  selection: Selection,
  prefix: string,
  suffix: string = '',
  multiline: boolean = false
): string => {
  let start = selection.start;
  let end = selection.end;
  let selectedText = text.substring(start, end);
  let newText = selectedText;

  if (multiline) {
    // Expand selection to include entire lines
    while (start > 0 && text[start - 1] !== '\n') {
      start--;
    }
    while (end < text.length && text[end] !== '\n') {
      end++;
    }
    selectedText = text.substring(start, end);
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

  return text.substring(0, start) + newText + text.substring(end);
};
