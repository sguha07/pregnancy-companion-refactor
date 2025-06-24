import React from 'react';
import { Menu } from 'lucide-react';

interface MenuButtonProps {
  onClick: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
    >
      <Menu className="w-6 h-6 text-gray-700" />
    </button>
  );
};