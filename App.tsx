import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ScheduleView from './components/ScheduleView';
import StandingsView from './components/StandingsView';
import { MATCHES, TEAMS } from './constants';
import { TabView } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabView>('SCHEDULE');

  return (
    <div className="min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black text-white pb-10">
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />
      
      <main className="max-w-5xl mx-auto px-4 py-6">
        {currentTab === 'SCHEDULE' && (
          <ScheduleView matches={MATCHES} teams={TEAMS} />
        )}
        {currentTab === 'STANDINGS' && (
          <StandingsView matches={MATCHES} teams={TEAMS} />
        )}
      </main>

      <footer className="border-t border-slate-800 mt-auto py-8 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Ragab Padel Tournament.</p>
      </footer>
    </div>
  );
};

export default App;