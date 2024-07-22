import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

import './App.css';

function App() {
  const [textArea, setTextArea] = useState<string>('');
  const [userMarkdown, setUserMarkdown] = useState<string>('');
  const [selectedText, setSelectedText] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => setUserMarkdown(textArea), 500);
    return () => clearTimeout(timeout);
  }, [textArea]);

  const handleSelect = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    setSelectedText(selectedText);
  };

  const setTextBold = () => {
    if (textArea && selectedText) {
      setTextArea((prev) => prev.replace(selectedText, `**${selectedText}**`));
    }
  };

  return (
    <main className="container mx-auto">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button
        className=" border-slate-700 pt-2 pb-2 pl-5 pr-5 font-medium bg-zinc-950 m-2  rounded-md"
        onClick={setTextBold}
      >
        B
      </button>
      <div style={styles.container}>
        <textarea
          style={styles.textArea}
          value={textArea}
          placeholder="Enter your markdown text here"
          onChange={(e) => setTextArea(e.target.value)}
          onSelect={handleSelect}
        ></textarea>

        <div style={styles.markdownArea}>
          <Markdown>{userMarkdown}</Markdown>
        </div>
      </div>
    </main>
  );
}

const styles = {
  main: {
    width: '100%',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: 0,
  },
  textArea: {
    flex: '1',
    padding: 20,
    minHeight: 200,
    marginRight: 5,
  },
  markdownArea: {
    flex: '2',
    border: '1px solid gray',
    padding: 20,
    minHeight: 200,
    width: '50%',
  },
};

export default App;
