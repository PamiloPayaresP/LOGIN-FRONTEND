import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthTabsProps {
  onLogin: (userData: any) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Tab Navigation */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-l-lg transition-colors ${
              activeTab === 'login'
                ? 'bg-white text-gray-900 border-2 border-gray-800'
                : 'bg-gray-200 text-gray-600 border-2 border-gray-400 hover:bg-gray-300'
            }`}
          >
            Log in
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 px-4 text-center font-medium rounded-r-lg transition-colors ${
              activeTab === 'register'
                ? 'bg-white text-gray-900 border-2 border-gray-800'
                : 'bg-gray-200 text-gray-600 border-2 border-gray-400 hover:bg-gray-300'
            }`}
          >
            Sign up
          </button>
        </div>

        {/* Content Container */}
        <div className="bg-white rounded-lg border-2 border-gray-800 p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {activeTab === 'login' ? 'Acceso' : 'Registro'}
          </h2>

          {activeTab === 'login' ? (
            <LoginForm onLogin={onLogin} />
          ) : (
            <RegisterForm onRegister={onLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthTabs;