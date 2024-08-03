import React from 'react';

interface FormatButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  text?: React.ReactNode;
  icon?: React.ReactNode;
}

const FormatButton: React.FC<FormatButtonProps> = ({ children, text, icon, onClick }) => {
  return (
    <button
      className="flex items-center justify-center flex-grow basis-0 min-w-[40px] h-8 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors duration-200"
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {children || text}
    </button>
  );
};

export default FormatButton;
