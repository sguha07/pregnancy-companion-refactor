import React, { useState } from 'react';
import { Menu, X, Package, Stethoscope, Baby, FileText, HelpCircle, Plane } from 'lucide-react';

interface HamburgerMenuProps {
  onSectionChange: (section: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'labor-delivery', label: 'Labor & Delivery', icon: Baby },
    { id: 'hospital-prep', label: 'Hospital Preparation', icon: Stethoscope },
    { id: 'baby-gear', label: 'Baby Gear Guide', icon: Package },
    { id: 'labor-prep', label: 'Labor Preparation', icon: FileText },
    { id: 'travel', label: 'Travel Guidelines', icon: Plane },
    { id: 'faq', label: 'Common Questions', icon: HelpCircle },
  ];

  const handleItemClick = (section: string) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
      >
        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-16 p-4">
          <h2 className="text-lg font-bold mb-4">Additional Resources</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center p-3 rounded-lg hover:bg-purple-50 transition-colors text-left"
              >
                <item.icon className="w-5 h-5 mr-3 text-purple-600" />
                <span className="text-gray-700">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};