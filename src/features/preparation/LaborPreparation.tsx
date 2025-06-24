import React, { useState } from 'react';
import { Activity, Heart, Wind, Brain } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { EnhancedLaborPreparation } from './EnhancedLaborPreparation';

interface LaborPreparationProps {
  kb: KnowledgeBaseService;
}

export const LaborPreparation: React.FC<LaborPreparationProps> = ({ kb }) => {
  return <EnhancedLaborPreparation kb={kb} />;
};