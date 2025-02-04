// src/components/dashboard/Login.tsx
"use client"
import React from 'react';
import { Github } from 'lucide-react';
import { DashboardUser } from '@/types/dashboard';

interface LoginProps {
  onLogin: (user: DashboardUser) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in with your preferred account</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => onLogin({ name: 'Demo User' })}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Continue with Google
          </button>
          <button
            onClick={() => onLogin({ name: 'Demo User' })}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 rounded-lg px-4 py-2 text-white hover:bg-gray-800"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};