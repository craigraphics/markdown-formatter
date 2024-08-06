import { useState } from 'react';
import Markdown from 'react-markdown';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/presentational/ThemeToggle';
import MarkdownEditor from './components/MarkdownEditor';
import { saveAsFile } from './utils/fileHelpers';

import './App.css';

function App() {
  const [userMarkdown, setUserMarkdown] = useState<string>('');

  const handleTextChange = (text: string) => {
    const timeout = setTimeout(() => setUserMarkdown(text), 1500);
    return () => clearTimeout(timeout);
  };

  const handleSave = () => {
    saveAsFile(userMarkdown, 'markdown-content.md', 'text/markdown');
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col h-screen bg-white dark:bg-[#212424] text-gray-800 dark:text-gray-200 transition-colors duration-200">
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MarkItDown</h1>
            <ThemeToggle />
          </div>
        </nav>

        <main className="flex-grow flex flex-col overflow-hidden">
          <div className="container mx-auto px-4 py-6">
            <h2 className="text-xl font-semibold mb-2">Markdown Online Formatter</h2>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
              This tool allows you to format text in real-time as you type. Enter your text in the field provided, and
              the corresponding Markdown will be generated automatically. To apply formatting, simply select the text
              and click the desired style button.
            </p>

            <button
              className="flex items-center justify-center flex-grow basis-0 min-w-[40px] h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200 p-2"
              onClick={handleSave}
            >
              Save as File
            </button>
          </div>

          <div className="flex-grow flex flex-col md:flex-row gap-4 px-4 pb-4 overflow-auto">
            <MarkdownEditor onTextChange={handleTextChange} />

            <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 overflow-auto">
              <h3 className="dark:bg-gray-700 bg-gray-200 -m-4 mb-6 p-2 dark:text-gray-300 font-semibold">Preview</h3>
              <Markdown className="prose dark:prose-invert max-w-none markdown-custom">{userMarkdown}</Markdown>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
