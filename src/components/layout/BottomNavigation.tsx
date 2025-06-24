import React from 'react';
import { Home, Calendar, Pill, AlertCircle, MessageCircle } from 'lucide-react';
import { Tab } from '../../types';

interface BottomNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'home' ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'tracker' ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs mt-1">Tracker</span>
          </button>
          
          <button
            onClick={() => setActiveTab('medications')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'medications' ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <Pill className="w-6 h-6" />
            <span className="text-xs mt-1">Meds</span>
          </button>
          
          <button
            onClick={() => setActiveTab('emergency')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'emergency' ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <AlertCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Emergency</span>
          </button>
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center p-2 ${
              activeTab === 'chat' ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs mt-1">Chat</span>
          </button>
        </div>
      </div>
    </nav>
  );
};