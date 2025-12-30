import React from 'react';
import { Tab } from '../types';
import { TABS } from '../constants';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-1 overflow-x-auto py-3 no-scrollbar">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as Tab)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${isActive 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
