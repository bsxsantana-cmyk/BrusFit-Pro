
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              BRUSFIT <span className="text-blue-600">PRO</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 pb-5 pt-5">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 pb-5 pt-5">Alunos</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 pb-5 pt-5">Exercícios</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 pb-5 pt-5">Planos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-slate-500 hover:text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
