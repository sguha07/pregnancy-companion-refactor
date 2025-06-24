import React from 'react';
import { X } from 'lucide-react';

interface DueDateModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const DueDateModal: React.FC<DueDateModalProps> = ({ showModal, setShowModal, onSubmit }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Update Due Date</h3>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your due date:
            </label>
            <input
              type="date"
              name="dueDate"
              required
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
          >
            Save Due Date
          </button>
        </form>
      </div>
    </div>
  );
};