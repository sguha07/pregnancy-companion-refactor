import OpenAI from 'openai';
import { Nutrient, WeightGainRecommendation, Symptom, Medication, WeekInfo, KnowledgeSection } from '../types';

export class KnowledgeBaseService {
  private knowledgeBase: any = null;
  private sections: KnowledgeSection[] = [];
  private openai: OpenAI | null = null;
  private embeddingsGenerated = false;

  constructor() {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
      });
    }
  }

  async initialize() {
    try {
      const response = await fetch('/knowledgeBase.json');
      const data = await response.json();
      this.knowledgeBase = data.pregnancyKnowledgeGraph;
      this.createSections();
      
      if (this.openai) {
        await this.generateEmbeddings();
      }
      
      console.log(`Knowledge base initialized with ${this.sections.length} sections`);
    } catch (error) {
      console.error('Failed to load knowledge base:', error);
    }
  }

  private createSections() {
    const kb = this.knowledgeBase;
    if (!kb) return;
    
    this.sections = []; // Clear existing sections
    
    // Nutritional requirements
    if (kb.nutritionalRequirements?.dailyMacros) {
      this.sections.push({
        id: 'nutrition-daily',
        content: `Daily nutritional requirements during pregnancy: ${kb.nutritionalRequirements.dailyMacros.map((n: Nutrient) => 
          `${n.nutrient}: ${n.amount} ${n.unit} (${n.category})`).join(', ')}`
      });
    }

    if (kb.nutritionalRequirements?.weightGainRecommendations) {
      this.sections.push({
        id: 'nutrition-weight',
        content: `Weight gain recommendations: ${kb.nutritionalRequirements.weightGainRecommendations.map((w: WeightGainRecommendation) => 
          `${w.prePregnancyBMI} (BMI ${w.bmiRange}): ${w.recommendedGain} ${w.unit}`).join(', ')}`
      });
    }

    // Food safety
    if (kb.foodSafety) {
      const unsafeSeafood = kb.foodSafety.seafoodGuidelines?.unsafe?.join(', ') || '';
      const avoidFoods = kb.foodSafety.avoidFoods?.map((f: any) => f.item).join(', ') || '';
      
      this.sections.push({
        id: 'food-safety',
        content: `Foods to avoid during pregnancy: Unsafe seafood (${unsafeSeafood}), ${avoidFoods}`
      });
    }

    // Morning sickness
    if (kb.morningSicknessManagement) {
      const whatToEat = kb.morningSicknessManagement.whatToEat?.join(', ') || '';
      const avoidFoods = kb.morningSicknessManagement.avoidFoods?.join(', ') || '';
      const eatingTips = kb.morningSicknessManagement.eatingTips?.join(', ') || '';
      
      this.sections.push({
        id: 'morning-sickness',
        content: `Morning sickness management: Eat ${whatToEat}. Avoid ${avoidFoods}. Tips: ${eatingTips}`
      });
    }

    // Pregnancy timeline
    if (kb.pregnancyTimeline) {
      Object.entries(kb.pregnancyTimeline).forEach(([key, value]: [string, any]) => {
        if (key === 'weeks40plus') {
          this.sections.push({
            id: 'timeline-overdue',
            content: `Post-term pregnancy (40+ weeks): Timeline - ${value.timeline}. Status - ${value.status}. What to expect - ${value.whatToExpect}`
          });
          return;
        }
        
        const symptoms = value.commonSymptoms?.map((s: any) => `${s.symptom} - ${s.status}`).join(', ') || 'No symptoms listed';
        const exercise = value.exercise ? `${value.exercise.name} - ${value.exercise.benefits}` : 'No exercise listed';
        
        this.sections.push({
          id: `timeline-${key}`,
          content: `${value.title} (${value.trimester} trimester): Common symptoms include ${symptoms}. Recommended exercise: ${exercise}`
        });
      });
    }

    // Symptoms
    if (kb.symptomTroubleshooting?.categories) {
      kb.symptomTroubleshooting.categories.forEach((cat: any) => {
        if (cat.symptoms) {
          cat.symptoms.forEach((symptom: any) => {
            this.sections.push({
              id: `symptom-${symptom.sign.toLowerCase().replace(/\s+/g, '-')}`,
              content: `${symptom.sign} (${cat.category}): ${symptom.action}. Urgency: ${symptom.urgency}. Severity: ${symptom.severity}`
            });
          });
        }
      });
    }

    // Medications
    if (kb.medications?.byCondition) {
      kb.medications.byCondition.forEach((condition: any) => {
        if (condition.medications) {
          condition.medications.forEach((med: any) => {
            this.sections.push({
              id: `medication-${med.drug.toLowerCase().replace(/\s+/g, '-')}`,
              content: `${med.drug} (${med.brand || 'Generic'}) for ${condition.condition}: ${med.safetyLevel}. ${med.note || ''}`
            });
          });
        }
      });
    }

    // Labor and Delivery
    if (kb.laborAndDelivery) {
      // Signs of labor
      if (kb.laborAndDelivery.signsOfLabor) {
        const waterBreaking = kb.laborAndDelivery.signsOfLabor.waterBreaking?.description || '';
        const whenToCall = kb.laborAndDelivery.signsOfLabor.whenToCallProvider?.rule511 || '';
        
        this.sections.push({
          id: 'labor-signs',
          content: `Signs of labor: Water breaking (${waterBreaking}). True labor contractions are regular and grow closer together. Call provider when: ${whenToCall}`
        });
      }

      // Stages of labor
      if (kb.laborAndDelivery.stagesOfLabor) {
        Object.entries(kb.laborAndDelivery.stagesOfLabor).forEach(([stage, info]: [string, any]) => {
          this.sections.push({
            id: `labor-${stage}`,
            content: `Labor ${info.name}: ${info.description || ''} ${info.timing || ''}`
          });
        });
      }

      // Pain management
      if (kb.laborAndDelivery.painManagement?.commonAndSafe) {
        kb.laborAndDelivery.painManagement.commonAndSafe.forEach((method: any) => {
          this.sections.push({
            id: `pain-${method.method.toLowerCase().replace(/\s+/g, '-')}`,
            content: `Pain management - ${method.method}: ${method.reliefLevel}. How it's given: ${method.howGiven}. Impact on baby: ${method.impactOnBaby}. Notes: ${method.notes}`
          });
        });
      }
    }

    // Hospital preparation
    if (kb.hospitalPreparation?.hospitalBag) {
      Object.entries(kb.hospitalPreparation.hospitalBag).forEach(([category, items]: [string, any]) => {
        if (Array.isArray(items)) {
          this.sections.push({
            id: `hospital-${category}`,
            content: `Hospital bag ${category}: ${items.join(', ')}`
          });
        }
      });
    }

    // Baby gear
    if (kb.babyGear) {
      Object.entries(kb.babyGear).forEach(([item, info]: [string, any]) => {
        const types = info.types?.join(', ') || 'No types listed';
        const safety = info.keySafety?.join(', ') || 'No safety features listed';
        const avoid = info.avoid?.join(', ') || 'No avoid items listed';
        
        this.sections.push({
          id: `gear-${item}`,
          content: `${item}: Types - ${types}. Safety features - ${safety}. Avoid: ${avoid}`
        });
      });
    }

    // Common questions
    if (kb.commonQuestions) {
      kb.commonQuestions.forEach((qa: any) => {
        this.sections.push({
          id: `faq-${qa.question.toLowerCase().replace(/\s+/g, '-').substring(0, 20)}`,
          content: `Q: ${qa.question} A: ${qa.answer} ${qa.details || ''}`
        });
      });
    }

    // Exercise guidelines
    if (kb.exerciseGuidelines) {
      const safe = kb.exerciseGuidelines.safe?.join(', ') || '';
      const avoid = kb.exerciseGuidelines.avoid?.join(', ') || '';
      const modifications = kb.exerciseGuidelines.modifications?.join(', ') || '';
      
      this.sections.push({
        id: 'exercise-guidelines',
        content: `Exercise during pregnancy: Safe exercises - ${safe}. Avoid - ${avoid}. Modifications - ${modifications}`
      });
    }

    // Travel guidelines
    if (kb.travelGuidelines) {
      Object.entries(kb.travelGuidelines).forEach(([mode, guidelines]: [string, any]) => {
        if (typeof guidelines === 'object' && guidelines.recommendations) {
          this.sections.push({
            id: `travel-${mode}`,
            content: `Travel by ${mode}: ${guidelines.recommendations.join(', ')}`
          });
        }
      });
    }
  }

  private async generateEmbeddings() {
    if (!this.openai || this.embeddingsGenerated) return;

    try {
      console.log(`Generating embeddings for ${this.sections.length} sections...`);
      
      const embeddingPromises = this.sections.map(async (section) => {
        try {
          const response = await this.openai!.embeddings.create({
            model: 'text-embedding-ada-002',
            input: section.content,
          });
          section.embedding = response.data[0].embedding;
        } catch (error) {
          console.error(`Failed to generate embedding for section ${section.id}:`, error);
        }
      });

      await Promise.all(embeddingPromises);
      this.embeddingsGenerated = true;
      console.log('Embeddings generated successfully');
    } catch (error) {
      console.error('Failed to generate embeddings:', error);
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }

  async findRelevantSections(query: string, topK: number = 3): Promise<KnowledgeSection[]> {
    console.log(`Searching for: "${query}"`);
    
    // Fallback to text-based search if embeddings aren't available
    if (!this.openai || !this.embeddingsGenerated) {
      console.log('Using fallback text search');
      const queryLower = query.toLowerCase();
      const results = this.sections
        .filter(section => section.content.toLowerCase().includes(queryLower))
        .slice(0, topK);
      console.log(`Found ${results.length} results with text search`);
      return results;
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: query,
      });
      const queryEmbedding = response.data[0].embedding;

      const sectionsWithScores = this.sections
        .filter(section => section.embedding)
        .map(section => ({
          section,
          score: this.cosineSimilarity(queryEmbedding, section.embedding!)
        }))
        .sort((a, b) => b.score - a.score);

      // FIXED: Lower the threshold to 0.3 for better results
      const results = sectionsWithScores
        .filter(item => item.score > 0.3)
        .slice(0, topK)
        .map(item => item.section);
        
      console.log(`Found ${results.length} results with embedding search (scores: ${sectionsWithScores.slice(0, 3).map(s => s.score.toFixed(3)).join(', ')})`);
      
      // If no good matches with embeddings, fall back to text search
      if (results.length === 0) {
        console.log('No good embedding matches, falling back to text search');
        const queryLower = query.toLowerCase();
        return this.sections
          .filter(section => section.content.toLowerCase().includes(queryLower))
          .slice(0, topK);
      }
      
      return results;
    } catch (error) {
      console.error('Failed to find relevant sections:', error);
      // Fallback to text search on error
      const queryLower = query.toLowerCase();
      return this.sections
        .filter(section => section.content.toLowerCase().includes(queryLower))
        .slice(0, topK);
    }
  }

  getKnowledgeBase() {
    return this.knowledgeBase;
  }

  getWeekInfo(week: number): WeekInfo | null {
    if (!this.knowledgeBase?.pregnancyTimeline) return null;
    
    if (week > 40) {
      return this.knowledgeBase.pregnancyTimeline.weeks40plus;
    }
    
    const ranges = [
      { min: 1, max: 4, value: 'weeks1to4' },
      { min: 5, max: 8, value: 'weeks5to8' },
      { min: 9, max: 12, value: 'weeks9to12' },
      { min: 13, max: 16, value: 'weeks13to16' },
      { min: 17, max: 20, value: 'weeks17to20' },
      { min: 21, max: 24, value: 'weeks21to24' },
      { min: 25, max: 28, value: 'weeks25to28' },
      { min: 29, max: 32, value: 'weeks29to32' },
      { min: 33, max: 36, value: 'weeks33to36' },
      { min: 37, max: 40, value: 'weeks37to40' },
    ];

    const match = ranges.find(range => week >= range.min && week <= range.max);
    return match ? this.knowledgeBase.pregnancyTimeline[match.value] : null;
  }

  checkMedicationSafety(medName: string): Medication[] {
    if (!this.knowledgeBase?.medications?.byCondition) return [];
    
    const results: Medication[] = [];
    this.knowledgeBase.medications.byCondition.forEach((condition: any) => {
      condition.medications?.forEach((med: any) => {
        if (med.drug?.toLowerCase().includes(medName.toLowerCase()) ||
            (med.brand && med.brand.toLowerCase().includes(medName.toLowerCase()))) {
          results.push({ ...med, condition: condition.condition });
        }
      });
    });
    return results;
  }

  getSymptomInfo(symptom: string): Symptom[] {
    if (!this.knowledgeBase?.symptomTroubleshooting?.categories) return [];
    
    const results: Symptom[] = [];
    this.knowledgeBase.symptomTroubleshooting.categories.forEach((cat: any) => {
      cat.symptoms?.forEach((s: any) => {
        if (s.sign?.toLowerCase().includes(symptom.toLowerCase())) {
          results.push({ ...s, category: cat.category });
        }
      });
    });
    return results;
  }

  getEmergencySymptoms(): Symptom[] {
    if (!this.knowledgeBase?.symptomTroubleshooting?.categories) return [];
    
    const emergencies: Symptom[] = [];
    this.knowledgeBase.symptomTroubleshooting.categories.forEach((cat: any) => {
      cat.symptoms?.forEach((s: any) => {
        if (s.severity === 'high') {
          emergencies.push({ ...s, category: cat.category });
        }
      });
    });
    return emergencies;
  }

  getNutritionalRequirements() {
    if (!this.knowledgeBase?.nutritionalRequirements) {
      return { dailyMacros: [], weightGainRecommendations: [] };
    }
    return this.knowledgeBase.nutritionalRequirements;
  }

  getLaborAndDeliveryInfo() {
    return this.knowledgeBase?.laborAndDelivery || null;
  }

  getHospitalPreparation() {
    return this.knowledgeBase?.hospitalPreparation || null;
  }

  getBabyGearInfo() {
    return this.knowledgeBase?.babyGear || null;
  }

  getPreparingForLaborInfo() {
    return this.knowledgeBase?.preparingForLabor || null;
  }

  getCommonQuestions() {
    return this.knowledgeBase?.commonQuestions || [];
  }

  getGeneralGuidelines() {
    return this.knowledgeBase?.generalGuidelines || null;
  }
}