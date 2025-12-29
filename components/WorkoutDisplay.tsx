
import React from 'react';
import { WorkoutPlan } from '../types';

interface WorkoutDisplayProps {
  plan: WorkoutPlan;
}

const WorkoutDisplay: React.FC<WorkoutDisplayProps> = ({ plan }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none">
      {/* Branding Header */}
      <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-blue-600 p-1 rounded">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold">BRUSFIT PRO</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 uppercase tracking-tight">{plan.title}</h1>
          <div className="flex flex-wrap gap-4 text-slate-400 text-sm">
            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Objetivo: {plan.goal}</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Nível: {plan.level}</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Divisão: {plan.split}</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span> Periodização: {plan.periodization}</span>
          </div>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-slate-400 text-xs mb-1">Data de Criação</p>
          <p className="font-medium">{new Date(plan.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      {/* Workout Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 gap-12">
          {plan.days.map((day, dIdx) => (
            <div key={dIdx} className="space-y-6">
              <div className="flex items-center space-x-4 border-b-2 border-slate-100 pb-2">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">{String.fromCharCode(65 + dIdx)}</span>
                <h2 className="text-2xl font-bold text-slate-800">{day.name}</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200">
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">Exercício</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">Séries</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">Reps</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">Descanso</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">RPE/RIR</th>
                      <th className="px-4 py-3 text-sm font-semibold text-slate-600 uppercase">Carga Sugerida</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {day.exercises.map((ex, eIdx) => (
                      <tr key={eIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-semibold text-slate-900">{ex.name}</div>
                          {ex.notes && <div className="text-xs text-slate-500 mt-1 italic">{ex.notes}</div>}
                        </td>
                        <td className="px-4 py-4 text-slate-700">{ex.sets}</td>
                        <td className="px-4 py-4 text-slate-700">{ex.reps}</td>
                        <td className="px-4 py-4 text-slate-700">{ex.rest}</td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-bold">
                            {ex.rpe ? `RPE ${ex.rpe}` : ex.rir ? `RIR ${ex.rir}` : '-'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-medium">{ex.loadSuggestion || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Section */}
        {plan.coachNotes && (
          <div className="mt-12 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Observações do Coach
            </h3>
            <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{plan.coachNotes}</p>
          </div>
        )}
      </div>

      <div className="bg-slate-100 p-4 text-center text-slate-500 text-xs no-print">
        © {new Date().getFullYear()} BRUSFIT PRO - Inteligência em Performance. Todos os direitos reservados.
      </div>
    </div>
  );
};

export default WorkoutDisplay;
