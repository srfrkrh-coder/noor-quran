import React, { useState } from 'react';
import { AppSettings } from '../types';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (s: Partial<AppSettings>) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, settings, onUpdateSettings }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Local state for API key input to avoid saving on every keystroke
  const [localApiKey, setLocalApiKey] = useState(settings.apiKey);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Ninjago1382!!') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است.');
    }
  };

  const handleSaveSettings = () => {
    onUpdateSettings({ apiKey: localApiKey });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">پنل مدیریت</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">نام کاربری</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-islamic-green outline-none"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">رمز عبور</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-islamic-green outline-none"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-islamic-green text-white py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              ورود
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            {/* API Key Section */}
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600">
               <h3 className="text-lg font-bold text-islamic-green mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 10.5V6H13.5V10.5H18V12H13.5V16.5H12V12H7.5V10.5H12Z"></path>
                  </svg>
                  تنظیمات ربات هوشمند
               </h3>
               <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                 برای فعال‌سازی ربات پاسخگوی دینی، کلید Gemini API را وارد کنید.
               </p>
               <input 
                 type="password"
                 value={localApiKey}
                 onChange={(e) => setLocalApiKey(e.target.value)}
                 placeholder="Gemini API Key"
                 className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-islamic-green outline-none"
               />
            </div>

            {/* Appearance Section */}
            <div className="space-y-3">
              <h3 className="text-md font-bold text-gray-800 dark:text-white">ظاهر برنامه</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateSettings({ theme: 'light' })}
                  className={`flex-1 py-2 rounded-lg border ${settings.theme === 'light' ? 'border-islamic-green bg-green-50 text-islamic-green' : 'border-gray-200 text-gray-600 dark:text-gray-400'}`}
                >
                  روشن
                </button>
                <button 
                  onClick={() => onUpdateSettings({ theme: 'dark' })}
                  className={`flex-1 py-2 rounded-lg border ${settings.theme === 'dark' ? 'border-islamic-green bg-gray-800 text-white' : 'border-gray-200 text-gray-600 dark:text-gray-400'}`}
                >
                  تاریک
                </button>
                 <button 
                  onClick={() => onUpdateSettings({ theme: 'nature' })}
                  className={`flex-1 py-2 rounded-lg border ${settings.theme === 'nature' ? 'border-green-600 bg-green-100 text-green-800' : 'border-gray-200 text-gray-600 dark:text-gray-400'}`}
                >
                  طبیعت
                </button>
              </div>
            </div>

            {/* Font Size Section */}
            <div className="space-y-3">
              <h3 className="text-md font-bold text-gray-800 dark:text-white">اندازه قلم</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => onUpdateSettings({ fontSize: 'normal' })}
                  className={`flex-1 py-2 rounded-lg border ${settings.fontSize === 'normal' ? 'border-islamic-green bg-green-50 text-islamic-green' : 'border-gray-200 text-gray-600 dark:text-gray-400'}`}
                >
                  عادی
                </button>
                <button 
                  onClick={() => onUpdateSettings({ fontSize: 'large' })}
                  className={`flex-1 py-2 rounded-lg border ${settings.fontSize === 'large' ? 'border-islamic-green bg-green-50 text-islamic-green' : 'border-gray-200 text-gray-600 dark:text-gray-400'}`}
                >
                  بزرگ
                </button>
              </div>
            </div>

            <button 
              onClick={handleSaveSettings}
              className="w-full bg-islamic-green text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200 dark:shadow-none"
            >
              ذخیره تغییرات
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;