import React from 'react';
import { Baby } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <Baby className="w-8 h-8 mr-2 text-purple-600" />
        Pregnancy Care Companion
      </h1>
      <p className="text-gray-600 mt-1">Your complete pregnancy tracking and health guide</p>
    </header>
  );
};