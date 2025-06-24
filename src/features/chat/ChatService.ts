import OpenAI from 'openai';
import { Message } from '../../types';
import { KnowledgeBaseService } from '../../services/KnowledgeBaseService';

export class ChatService {
  private openai: OpenAI | null = null;
  private kb: KnowledgeBaseService;

  constructor(knowledgeBaseService: KnowledgeBaseService) {
    this.kb = knowledgeBaseService;
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }

  async processMessage(userInput: string): Promise<Message> {
    try {
      console.log(`Processing message: "${userInput}"`);
      
      // Find relevant knowledge base sections with increased search scope
      const relevantSections = await this.kb.findRelevantSections(userInput, 5);
      console.log(`Found ${relevantSections.length} relevant sections`);
      
      if (!this.openai) {
        return {
          role: 'assistant',
          content: "OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.",
          source: 'error'
        };
      }

      // Prepare enhanced context from knowledge base
      const kbContext = relevantSections.length > 0 
        ? `RELEVANT PREGNANCY INFORMATION:\n${relevantSections.map((s, i) => `${i+1}. ${s.content}`).join('\n\n')}`
        : '';

      // Check if we have any relevant information
      const hasRelevantInfo = relevantSections.length > 0;

      const systemPrompt = `You are a helpful pregnancy care assistant with access to a comprehensive medical knowledge base about pregnancy, labor, medications, symptoms, and more.

CRITICAL INSTRUCTIONS:
1. If the knowledge base context contains relevant information for the user's question, YOU MUST use it as your primary source and start your response with "[Using pregnancy knowledge base]"
2. If the knowledge base doesn't contain relevant information, start your response with "[Using general knowledge]"
3. Always prioritize the knowledge base information over general knowledge when available
4. Provide specific, actionable advice based on the context provided
5. Always recommend consulting healthcare providers for medical decisions
6. Be conversational and supportive while remaining medically accurate

${hasRelevantInfo ? `\nKNOWLEDGE BASE CONTEXT:\n${kbContext}` : '\nNo specific information found in the pregnancy knowledge base for this query.'}`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userInput
          }
        ],
        temperature: 0.7,
        max_tokens: 600
      });

      const responseContent = completion.choices[0].message.content || 'I couldn\'t generate a response.';
      
      // Determine source based on AI's explicit statement and context availability
      const usedKnowledgeBase = responseContent.includes('[Using pregnancy knowledge base]') || hasRelevantInfo;
      
      // Clean up the response by removing the markers
      const cleanedResponse = responseContent
        .replace('[Using pregnancy knowledge base]', '')
        .replace('[Using general knowledge]', '')
        .trim();

      console.log(`Response generated using ${usedKnowledgeBase ? 'knowledge base' : 'general knowledge'}`);

      return {
        role: 'assistant',
        content: cleanedResponse,
        source: usedKnowledgeBase ? 'knowledge-base' : 'ai-general'
      };
    } catch (error) {
      console.error("Chat error:", error);
      return {
        role: 'assistant',
        content: "Sorry, I'm having trouble responding right now. Please try again later.",
        source: 'error'
      };
    }
  }
}