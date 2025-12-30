import React, { useState } from 'react';
import { Tab } from './types';
import { TabNavigation } from './components/TabNavigation';
import { BasicsTab } from './components/tabs/BasicsTab';
import { RequestResponseTab } from './components/tabs/RequestResponseTab';
import { MitmTab } from './components/tabs/MitmTab';
import { HandshakeTab } from './components/tabs/HandshakeTab';
import { EvolutionTab } from './components/tabs/EvolutionTab';
import { QuizTab } from './components/tabs/QuizTab';
import { Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BASICS);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.BASICS: return <BasicsTab />;
      case Tab.REQUEST_RESPONSE: return <RequestResponseTab />;
      case Tab.MITM: return <MitmTab />;
      case Tab.HANDSHAKE: return <HandshakeTab />;
      case Tab.EVOLUTION: return <EvolutionTab />;
      case Tab.QUIZ: return <QuizTab />;
      default: return <BasicsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto px-4 py-8 pb-20">
        <div className="mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-2 flex items-center gap-3">
              <Shield className="text-cyan-400" size={40} />
              SecurePath
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              An interactive playground to explore how HTTP works, why it's vulnerable, and how HTTPS secures the web.
            </p>
        </div>

        <div className="bg-slate-900/50 rounded-2xl p-1 min-h-[600px] transition-all duration-300">
           {renderContent()}
        </div>
      </main>
    </div>
  );
}
