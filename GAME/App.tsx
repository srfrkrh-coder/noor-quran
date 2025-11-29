import React, { useState, useEffect } from 'react';
import DhikrCounter from './components/DhikrCounter';
import DailyHadith from './components/DailyHadith';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';
import { AppSettings } from './types';

function App() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('dhikr_count');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : { theme: 'light', fontSize: 'normal', apiKey: '' };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('dhikr_count', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
    
    // Apply Theme and Font Size
    const root = window.document.documentElement;
    root.classList.remove('dark', 'nature');
    
    // Theme Logic
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.style.colorScheme = 'light';
    }
    
    if (settings.theme === 'nature') {
      root.classList.add('nature');
    }

    // Font Size Logic
    // Default Tailwind root size is usually 16px (1rem). 
    // We scale it up for "large" which scales all rem-based units.
    if (settings.fontSize === 'large') {
      root.style.fontSize = '20px'; // 125% scale
    } else {
      root.style.fontSize = '16px'; // Normal scale
    }

  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      settings.theme === 'nature' ? 'bg-[#e8f5e9]' : 'bg-gray-50 dark:bg-gray-900'
    }`}>
      {/* Navbar / Header */}
      <header className="fixed top-0 left-0 right-0 h-16 glass z-30 px-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-islamic-green flex items-center justify-center text-white font-bold shadow-lg">
             ن
           </div>
           <h1 className="text-xl font-bold text-gray-800 dark:text-white">ذکر شمار نور</h1>
        </div>
        
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700 dark:text-gray-300">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
        <DailyHadith />
        
        <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[400px]">
           <DhikrCounter count={count} setCount={setCount} />
        </div>
      </main>

      {/* Admin Panel Modal */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        settings={settings}
        onUpdateSettings={updateSettings}
      />

      {/* Chat Bot Widget */}
      <ChatBot apiKey={settings.apiKey} />
    </div>
  );
}

export default App;