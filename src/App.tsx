import React, { useState, useEffect } from 'react';
import { Tab } from './types';
import { KnowledgeBaseService } from './services/KnowledgeBaseService';
import { ChatService } from './features/chat/ChatService';

// Layout Components
import { Header } from './components/layout/Header';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { DueDateModal } from './components/modals/DueDateModal';
import { HamburgerMenu } from './components/layout/HamburgerMenu';

// Feature Components
import { HomePage } from './features/home/HomePage';
import { WeekTracker } from './features/tracker/WeekTracker';
import { MedicationChecker } from './features/medications/MedicationChecker';
import { SymptomTracker } from './features/symptoms/SymptomTracker';
import { NutritionPlanner } from './features/nutrition/NutritionPlanner';
import { EmergencyGuide } from './features/emergency/EmergencyGuide';
import { ChatAssistant } from './features/chat/ChatAssistant';

// Enhanced Feature Components
import { LaborDeliveryGuide } from './features/labor/LaborDeliveryGuide';
import { HospitalPreparation } from './features/hospital/HospitalPreparation';
import { BabyGearGuide } from './features/gear/BabyGearGuide';
import { LaborPreparation } from './features/preparation/LaborPreparation';
import { TravelGuidelines } from './features/info/TravelGuidelines';

const PregnancyTrackerApp: React.FC = () => {
  const [kb] = useState(() => new KnowledgeBaseService());
  const [chatService] = useState(() => new ChatService(kb));
  const [isKbLoaded, setIsKbLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [activeSection, setActiveSection] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>(() => {
    const saved = localStorage.getItem('pregnancyDueDate');
    return saved || '';
  });
  const [showDueDateModal, setShowDueDateModal] = useState(false);

  // Calculate current pregnancy week
  const calculateCurrentWeek = (): number => {
    if (!dueDate) return 1;
    
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // 280 days (40 weeks) is typical pregnancy length
    const currentWeek = Math.max(1, Math.min(45, 40 - Math.floor(diffDays / 7)));
    return currentWeek;
  };

  const currentWeek = calculateCurrentWeek();

  useEffect(() => {
    const initializeKB = async () => {
      try {
        await kb.initialize();
        setIsKbLoaded(true);
      } catch (error) {
        console.error('Failed to initialize knowledge base:', error);
        setIsKbLoaded(true); // Still show the app even if KB fails
      }
    };

    initializeKB();
  }, [kb]);

  useEffect(() => {
    if (dueDate) {
      localStorage.setItem('pregnancyDueDate', dueDate);
    }
  }, [dueDate]);

  // Show due date modal if no due date is set
  useEffect(() => {
    if (!dueDate && isKbLoaded) {
      setShowDueDateModal(true);
    }
  }, [dueDate, isKbLoaded]);

  const handleDueDateSet = (date: string) => {
    setDueDate(date);
    setShowDueDateModal(false);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setActiveTab('home'); // Reset to home tab when accessing hamburger menu sections
  };

  const getWeekInfo = () => {
    if (!isKbLoaded) return null;
    return kb.getWeekInfo(currentWeek);
  };

  const getEmergencySymptoms = () => {
    if (!isKbLoaded) return [];
    return kb.getEmergencySymptoms();
  };

  if (!isKbLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your pregnancy companion...</p>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    if (activeSection) {
      switch (activeSection) {
        case 'labor-delivery':
          return <LaborDeliveryGuide kb={kb} />;
        case 'hospital-prep':
          return <HospitalPreparation kb={kb} />;
        case 'baby-gear':
          return <BabyGearGuide kb={kb} />;
        case 'labor-prep':
          return <LaborPreparation kb={kb} />;
        case 'travel':
          return <TravelGuidelines kb={kb} />;
        default:
          return (
            <HomePage 
              currentWeek={currentWeek}
              dueDate={dueDate}
              weekInfo={getWeekInfo()}
              emergencySymptoms={getEmergencySymptoms()}
              isKbLoaded={isKbLoaded}
              setActiveTab={setActiveTab}
              setShowDueDateModal={setShowDueDateModal}
            />
          );
      }
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomePage 
            currentWeek={currentWeek}
            dueDate={dueDate}
            weekInfo={getWeekInfo()}
            emergencySymptoms={getEmergencySymptoms()}
            isKbLoaded={isKbLoaded}
            setActiveTab={setActiveTab}
            setShowDueDateModal={setShowDueDateModal}
          />
        );
      case 'tracker':
        return (
          <WeekTracker 
            currentWeek={currentWeek}
            dueDate={dueDate}
            weekInfo={getWeekInfo()}
            kb={kb}
          />
        );
      case 'medications':
        return <MedicationChecker kb={kb} />;
      case 'symptoms':
        return <SymptomTracker kb={kb} />;
      case 'nutrition':
        return <NutritionPlanner kb={kb} />;
      case 'emergency':
        return <EmergencyGuide emergencySymptoms={getEmergencySymptoms()} />;
      case 'chat':
        return <ChatAssistant chatService={chatService} />;
      default:
        return (
          <HomePage 
            currentWeek={currentWeek}
            dueDate={dueDate}
            weekInfo={getWeekInfo()}
            emergencySymptoms={getEmergencySymptoms()}
            isKbLoaded={isKbLoaded}
            setActiveTab={setActiveTab}
            setShowDueDateModal={setShowDueDateModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <main className="pb-20">
          {renderMainContent()}
        </main>
      </div>

      <BottomNavigation 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveSection('');
        }} 
      />

      <HamburgerMenu onSectionChange={handleSectionChange} />

      {showDueDateModal && (
        <DueDateModal
          onClose={() => setShowDueDateModal(false)}
          onDueDateSet={handleDueDateSet}
          currentDueDate={dueDate}
        />
      )}
    </div>
  );
};

export default PregnancyTrackerApp;