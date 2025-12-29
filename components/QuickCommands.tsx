
import React from 'react';

interface QuickCommandsProps {
  onSelect: (command: string) => void;
}

const COMMAND_CATEGORIES = [
  {
    name: 'Hipertrofia',
    icon: '💪',
    commands: [
      'Criar treino de hipertrofia full body iniciante academia',
      'Criar treino de hipertrofia AB intermediário academia',
      'Criar treino de hipertrofia ABC avançado academia',
      'Criar treino de hipertrofia foco em pernas intermediário',
      'Criar treino de hipertrofia foco em membros superiores avançado',
      'Criar treino de hipertrofia com halteres intermediário',
      'Criar treino de hipertrofia em casa avançado',
      'Criar treino de hipertrofia com séries progressivas',
      'Criar treino de hipertrofia com RIR 2',
      'Criar treino de hipertrofia com descanso longo'
    ]
  },
  {
    name: 'Emagrecimento',
    icon: '🔥',
    commands: [
      'Criar treino de emagrecimento full body iniciante casa',
      'Criar treino de emagrecimento circuito intermediário',
      'Criar treino de emagrecimento com peso corporal',
      'Criar treino de emagrecimento com halteres',
      'Criar treino de emagrecimento 30 minutos',
      'Criar treino de emagrecimento com descanso curto',
      'Criar treino de emagrecimento para iniciantes acima de 40 anos',
      'Criar treino de emagrecimento funcional',
      'Criar treino de emagrecimento com core',
      'Criar treino de emagrecimento metabólico'
    ]
  },
  {
    name: 'Força & Power',
    icon: '⚡',
    commands: [
      'Criar treino de força full body intermediário',
      'Criar treino de força ABC avançado',
      'Criar treino de força para pernas',
      'Criar treino de força com barra',
      'Criar treino de força com cargas altas',
      'Criar treino de força com descanso longo',
      'Criar treino de força baseado em %1RM',
      'Criar treino de força com RPE',
      'Criar treino de força para alunos experientes',
      'Criar treino de força com progressão semanal'
    ]
  },
  {
    name: 'Saúde & Qualidade de Vida',
    icon: '🧘',
    commands: [
      'Criar treino para saúde full body iniciante',
      'Criar treino para qualidade de vida acima de 50 anos',
      'Criar treino para saúde com foco em mobilidade',
      'Criar treino para saúde com baixo impacto',
      'Criar treino para saúde em casa',
      'Criar treino para saúde com bola suíça',
      'Criar treino para saúde com elásticos',
      'Criar treino para saúde com alongamento',
      'Criar treino para saúde para idosos',
      'Criar treino para saúde geral'
    ]
  },
  {
    name: 'Condicionamento & Resistência',
    icon: '🏃',
    commands: [
      'Criar treino de condicionamento físico full body',
      'Criar treino de condicionamento físico funcional',
      'Criar treino de resistência muscular full body',
      'Criar treino de resistência muscular com séries longas',
      'Criar treino de resistência muscular circuito',
      'Criar treino de resistência muscular 25 repetições'
    ]
  },
  {
    name: 'Ajustes & Adaptações',
    icon: '🛠️',
    commands: [
      'Ajustar treino para iniciante',
      'Aumentar intensidade do treino',
      'Reduzir volume do treino',
      'Adaptar treino para treino em casa',
      'Substituir exercícios por halteres',
      'Inserir mobilidade no treino',
      'Inserir alongamento pós-treino',
      'Aplicar progressão semanal',
      'Aplicar deload',
      'Ajustar descanso'
    ]
  },
  {
    name: 'Análise & Relatórios',
    icon: '📊',
    commands: [
      'Analisar evolução do aluno',
      'Comparar desempenho semanal',
      'Sugerir aumento de carga',
      'Detectar fadiga',
      'Sugerir troca de exercícios',
      'Avaliar equilíbrio muscular',
      'Gerar relatório do treino'
    ]
  }
];

const QuickCommands: React.FC<QuickCommandsProps> = ({ onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 px-1">
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Biblioteca PRO</h3>
      </div>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar pb-10">
        {COMMAND_CATEGORIES.map((cat) => (
          <div key={cat.name} className="space-y-2">
            <div className="flex items-center text-[11px] font-black text-slate-500 uppercase tracking-tighter bg-slate-100 py-1 px-2 rounded">
              <span className="mr-2">{cat.icon}</span> {cat.name}
            </div>
            <div className="grid grid-cols-1 gap-1.5">
              {cat.commands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => onSelect(cmd)}
                  className="text-left px-3 py-2.5 text-[11px] font-medium bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50/30 transition-all shadow-sm truncate"
                  title={cmd}
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickCommands;
