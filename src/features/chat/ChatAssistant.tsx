import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, AlertCircle, CheckCircle, Brain } from 'lucide-react';
import { Message } from '../../types';
import { ChatService } from './ChatService';

interface ChatAssistantProps {
  chatService: ChatService;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({ chatService }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your pregnancy assistant powered by a comprehensive medical knowledge base. I can help you with:\n\n• Symptoms and when to call your provider\n• Medication safety during pregnancy\n• Nutritional requirements and food safety\n• Labor and delivery information\n• Exercise guidelines\n• Baby gear safety\n• Common pregnancy questions\n\nWhat would you like to know about your pregnancy journey?',
      source: 'knowledge-base'
    }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Suggested questions to help users get started
  const suggestedQuestions = [
    "What medications are safe during pregnancy?",
    "What are the signs of labor?",
    "What foods should I avoid?",
    "When should I call my doctor?",
    "What exercise is safe during pregnancy?",
    "What should I pack in my hospital bag?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;
    
    const userMessage: Message = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    
    try {
      const assistantMessage = await chatService.processMessage(chatInput);
      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try asking your question again.',
        source: 'error'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isLoading) return;
    setChatInput(question);
  };

  const getSourceIcon = (source?: string) => {
    switch (source) {
      case 'knowledge-base':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'ai-general':
        return <Brain className="w-3 h-3 mr-1" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 mr-1" />;
      default:
        return <CheckCircle className="w-3 h-3 mr-1" />;
    }
  };

  const getSourceText = (source?: string) => {
    switch (source) {
      case 'knowledge-base':
        return 'Based on verified medical information';
      case 'ai-general':
        return 'General advice - consult your doctor';
      case 'error':
        return 'Error occurred';
      default:
        return 'Based on verified medical information';
    }
  };

  const getSourceColor = (source?: string) => {
    switch (source) {
      case 'knowledge-base':
        return 'text-green-600';
      case 'ai-general':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="h-[700px]">
      <div className="flex flex-col h-full bg-white rounded-xl shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            Pregnancy Assistant
          </h2>
          <p className="text-xs text-gray-500 mt-1">Powered by comprehensive pregnancy knowledge base + OpenAI GPT-3.5</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.role === 'assistant' && (
                  <p className={`text-xs mt-2 flex items-center ${getSourceColor(msg.source)}`}>
                    {getSourceIcon(msg.source)}
                    {getSourceText(msg.source)}
                  </p>
                )}
              </div>
            </div>
          ))}
          
          {/* Suggested questions - only show when chat is empty or after initial message */}
          {chatMessages.length <= 1 && !isLoading && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Try asking about:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left p-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-100 text-gray-800">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleChatSubmit} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about symptoms, medications, nutrition, labor..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
              disabled={isLoading || !chatInput.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            AI responses use your pregnancy knowledge base when relevant. Always consult your healthcare provider for medical decisions.
          </p>
        </form>
      </div>
    </div>
  );
};