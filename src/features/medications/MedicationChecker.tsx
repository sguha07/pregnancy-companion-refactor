import React, { useState } from 'react';
import { Shield, Search, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

// Import the enhanced component we created
import { EnhancedMedicationSafety } from './EnhancedMedicationSafety';

interface MedicationCheckerProps {
  kb: KnowledgeBaseService;
}

export const MedicationChecker: React.FC<MedicationCheckerProps> = ({ kb }) => {
  // Simply use the enhanced component
  return <EnhancedMedicationSafety kb={kb} />;
};