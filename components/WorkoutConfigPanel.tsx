
import React from 'react';
import { WorkoutConfig, PeriodizationType } from '../types';

interface Props {
  config: WorkoutConfig;
  onChange: (config: WorkoutConfig) => void;
}

const MUSCLE_GROUPS = [
  'Peito', 'Costas', 'Quadríceps', 'Posterior de Coxa', 
  'Glúteos', 'Ombros', 'Bíceps', 'Tríceps', 'Panturrilhas', 'Core'
];

const WorkoutConfigPanel: React.FC<Props> = ({ config, onChange }) => {
  const toggleMuscle = (group: string) => {
    const newGroups = config.muscleGroups.includes(group)
      ? config.muscleGroups.filter(g => g !== group)
      : [...config.muscleGroups, group];
    onChange({ ...config, muscleGroups: newGroups });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-800">Parâmetros do Treino</h3>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">Configurações Técnicas</span>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Muscle Groups */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">Grupos Musculares Alvo</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MUSCLE_GROUPS.map(group => (
              <button
                key={group}
                onClick={() => toggleMuscle(group)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  config.muscleGroups.includes(group)
                    ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exercise Count */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Qtd. Exercícios (Total)</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="3"
                max="12"
                value={config.exerciseCount}
                onChange={(e) => onChange({ ...config, exerciseCount: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-lg font-bold text-blue-600 w-8">{config.exerciseCount}</span>
            </div>
          </div>

          {/* Periodization */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Periodização</label>
            <select
              value={config.periodization}
              onChange={(e) => onChange({ ...config, periodization: e.target.value as PeriodizationType })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="Linear">Linear (Carga ↑)</option>
              <option value="Ondulatória">Ondulatória (Volume/Intensidade ~)</option>
              <option value="Angular">Angular (Técnicas Avançadas)</option>
            </select>
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Foco de Seleção</label>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['Básicos/Multiarticulares', 'Equilibrado', 'Isoladores'] as const).map(p => (
              <button
                key={p}
                onClick={() => onChange({ ...config, priority: p })}
                className={`flex-1 py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  config.priority === p 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutConfigPanel;
