import React from 'react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

// Import the enhanced component we created
import { EnhancedSymptomTracker } from './EnhancedSymptomTracker';

interface SymptomTrackerProps {
  kb: KnowledgeBaseService;
}

export const SymptomTracker: React.FC<SymptomTrackerProps> = ({ kb }) => {
  // Simply use the enhanced component
  return <EnhancedSymptomTracker kb={kb} />;
};