// ==================== TYPES ====================
export type Nutrient = {
  nutrient: string;
  amount: string;
  unit: string;
  category: string;
};

export type WeightGainRecommendation = {
  prePregnancyBMI: string;
  bmiRange: string;
  recommendedGain: string;
  unit: string;
};

export type Symptom = {
  sign: string;
  urgency: string;
  action: string;
  severity: 'low' | 'medium' | 'high';
  category?: string;
};

export type Medication = {
  drug: string;
  brand?: string;
  safety: string;
  safetyLevel: string;
  note?: string;
  condition?: string;
};

export type WeekInfo = {
  trimester: string;
  title: string;
  commonSymptoms: Array<{ symptom: string; status: string }>;
  exercise?: {
    name: string;
    benefits: string;
    instructions: string[];
  };
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  source?: 'knowledge-base' | 'ai-general' | 'error';
};

export type Tab = 'home' | 'tracker' | 'medications' | 'symptoms' | 'nutrition' | 'emergency' | 'chat';

export type KnowledgeSection = {
  id: string;
  content: string;
  embedding?: number[];
};