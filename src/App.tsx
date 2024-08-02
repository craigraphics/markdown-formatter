// src/App.tsx

import { useState } from 'react';
import Markdown from 'react-markdown';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/presentational/ThemeToggle';
import MarkdownEditor from './components/MarkdownEditor';
import './App.css';

function App() {
  const [userMarkdown, setUserMarkdown] = useState<string>('');

  const handleTextChange = (text: string) => {
    const timeout = setTimeout(() => setUserMarkdown(text), 1500);
    return () => clearTimeout(timeout);
  };

  return (
    <ThemeProvider>
      <main className="flex flex-col h-screen bg-white dark:bg-[#212424] text-gray-800 dark:text-gray-200 transition-colors duration-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Markdown Online Formatter</h1>
            <ThemeToggle />
          </div>
          <p className="text-lg mb-6 text-gray-600 dark:text-gray-300 text-left">
            This tool will let you visualize the text and give it format in real-time. Please add text to the text field
            and the Markdown will be generated.
          </p>
        </div>

        <div className="flex-grow flex flex-col md:flex-row gap-4 px-4 pb-4">
          <MarkdownEditor onTextChange={handleTextChange} />

          <div className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700  overflow-auto">
            <Markdown className="prose dark:prose-invert max-w-none markdown-custom">{userMarkdown}</Markdown>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
