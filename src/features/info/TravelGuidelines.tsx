import React, { useState } from 'react';
import { Plane, Car, Ship, AlertTriangle, CheckCircle } from 'lucide-react';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';
import { EnhancedTravelGuidelines } from './EnhancedTravelGuidelines';

interface TravelGuidelinesProps {
  kb: KnowledgeBaseService;
}

export const TravelGuidelines: React.FC<TravelGuidelinesProps> = ({ kb }) => {
  return <EnhancedTravelGuidelines kb={kb} />;
};