
import React, { useState } from 'react';
import Header from './components/Header';
import AssessmentForm from './components/AssessmentForm';
import WorkoutDisplay from './components/WorkoutDisplay';
import WorkoutConfigPanel from './components/WorkoutConfigPanel';
import QuickCommands from './components/QuickCommands';
import { generateWorkout } from './services/geminiService';
import { WorkoutPlan, PhysicalAssessment, WorkoutConfig } from './types';

const App: React.FC = () => {
  const [command, setCommand] = useState('');
  const [assessment, setAssessment] = useState<PhysicalAssessment | null>(null);
  const [workoutConfig, setWorkoutConfig] = useState<WorkoutConfig>({
    muscleGroups: ['Peito', 'Costas', 'Quadríceps'],
    exerciseCount: 6,
    priority: 'Equilibrado',
    periodization: 'Linear'
  });
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const handleGenerate = async () => {
    if (!command.trim()) return;
    setLoading(true);
    try {
      const generatedPlan = await generateWorkout(command, workoutConfig, assessment || undefined);
      setPlan(generatedPlan);
    } catch (error) {
      console.error('Error generating workout:', error);
      alert('Erro ao gerar treino. Verifique sua conexão ou chave API.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Quick Commands Sidebar (Lado Esquerdo) */}
          <div className="lg:col-span-1 no-print hidden lg:block">
            <div className="sticky top-24 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
               <QuickCommands onSelect={(cmd) => setCommand(cmd)} />
            </div>
          </div>

          {/* Central Controls and Plan Display */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Input Card */}
              <div className="md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 no-print">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Interface de Prescrição BRUSFIT
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <textarea
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder='Digite ou selecione um comando ao lado. Ex: "Criar treino de hipertrofia ABC avançado"'
                    className="w-full h-32 px-5 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all resize-none shadow-inner bg-slate-50/50 font-medium"
                  />
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleGenerate}
                      disabled={loading || !command}
                      className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                         <>
                           <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           <span>PROCESSANDO...</span>
                         </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="uppercase tracking-widest">GERAR PROTOCOLO DE ELITE</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => { setCommand(''); setPlan(null); }}
                      className="px-6 bg-slate-100 text-slate-500 rounded-2xl font-bold text-xs hover:bg-slate-200 transition-colors uppercase"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Options Card */}
              <div className="md:col-span-1 space-y-3 no-print">
                <button
                  onClick={() => setShowAssessment(!showAssessment)}
                  className={`w-full h-1/2 rounded-3xl border-2 transition-all flex flex-col items-center justify-center p-6 text-center group relative overflow-hidden ${
                    assessment ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-400'
                  }`}
                >
                  <div className={`p-3 rounded-2xl mb-2 transition-colors ${assessment ? 'bg-emerald-100' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
                    <svg className={`w-8 h-8 ${assessment ? 'text-emerald-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tighter leading-tight">Avaliação Física /<br/>Bioimpedância</span>
                  {assessment && (
                    <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full shadow-sm">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className={`w-full h-1/2 rounded-3xl border-2 transition-all flex flex-col items-center justify-center p-6 text-center group ${
                    showConfig ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-100 text-slate-600 hover:border-blue-400'
                  }`}
                >
                  <div className={`p-3 rounded-2xl mb-2 transition-colors ${showConfig ? 'bg-slate-800' : 'bg-slate-50 group-hover:bg-slate-100'}`}>
                    <svg className={`w-8 h-8 ${showConfig ? 'text-white' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-tighter leading-tight">Configuração<br/>Técnica</span>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {showAssessment && (
                <div className="no-print animate-in slide-in-from-bottom-8 duration-500">
                  <AssessmentForm onSave={(data) => {
                    setAssessment(data);
                    setShowAssessment(false);
                  }} />
                </div>
              )}

              {showConfig && !showAssessment && (
                <div className="no-print animate-in slide-in-from-bottom-8 duration-500">
                  <WorkoutConfigPanel config={workoutConfig} onChange={setWorkoutConfig} />
                </div>
              )}

              {loading && (
                <div className="min-h-[500px] flex flex-col items-center justify-center bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-blue-50/20 animate-pulse"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                    <div className="text-center space-y-3">
                      <h4 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">BRUSFIT ENGINE</h4>
                      <p className="text-blue-600 font-bold text-sm tracking-widest animate-pulse">SINCROZINANDO PERIODIZAÇÃO CIENTÍFICA...</p>
                      <p className="text-slate-400 text-xs uppercase font-bold">Analisando Bioimpedância & MRV</p>
                    </div>
                  </div>
                </div>
              )}

              {plan && !loading && !showAssessment && !showConfig && (
                <div className="animate-in fade-in zoom-in-95 duration-700">
                  <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white rounded-2xl shadow-sm border border-slate-100 no-print">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                         </svg>
                       </div>
                       <div>
                         <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest italic leading-none">Protocolo Validado</h2>
                         <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Pronto para Exportação</p>
                       </div>
                    </div>
                    <button 
                      onClick={handlePrint}
                      className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs hover:bg-blue-700 transition-all flex items-center space-x-2 shadow-lg shadow-blue-100 hover:-translate-y-0.5"
                    >
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                       </svg>
                       <span>PDF / IMPRIMIR FICHA</span>
                    </button>
                  </div>
                  <WorkoutDisplay plan={plan} />
                </div>
              )}

              {!plan && !loading && !showAssessment && !showConfig && (
                <div className="min-h-[500px] flex flex-col items-center justify-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200 p-12 text-center group">
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-4xl font-black text-slate-800 mb-4 uppercase tracking-tighter italic">Engine de Performance</h3>
                  <p className="text-slate-500 max-w-sm text-lg leading-snug">
                    Use os <span className="text-blue-600 font-bold">Comandos Rápidos</span> ou digite sua necessidade para gerar um treino baseado em ciência.
                  </p>
                  <div className="mt-12 flex space-x-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-black text-slate-900 leading-none">500+</div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">EXERCÍCIOS</div>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div className="flex flex-col items-center">
                      <div className="text-2xl font-black text-slate-900 leading-none">PRO</div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">ANALYSIS</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-6">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">B</div>
             <span className="text-2xl font-black italic tracking-tighter">BRUSFIT <span className="text-blue-600">PRO</span></span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center max-w-md leading-relaxed">
            O sistema definitivo para Treinadores de Elite. Inteligência Artificial aplicada à Fisiologia e Biomecânica Humana.
          </p>
          <div className="mt-8 flex space-x-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <span>Periodização Linear</span>
            <span>Ondulatória</span>
            <span>Angular</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
