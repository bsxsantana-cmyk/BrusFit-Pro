
import React, { useState } from 'react';
import { PhysicalAssessment } from '../types';

interface AssessmentFormProps {
  onSave: (data: PhysicalAssessment) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<PhysicalAssessment>({
    weight: 0,
    height: 0,
    currentActivityLevel: 'Moderadamente Ativo',
    bioimpedance: {},
    measurements: {}
  });

  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'weight' || name === 'height' || name === 'bodyFat') ? Number(value) : value
    }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      bioimpedance: { ...prev.bioimpedance, [name]: Number(value) }
    }));
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      measurements: { ...prev.measurements, [name]: Number(value) }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const InputGroup = ({ label, name, value, onChange, placeholder, type = "number", unit = "cm" }: any) => (
    <div className="flex flex-col">
      <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value || ''}
          onChange={onChange}
          className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder={placeholder}
        />
        <span className="absolute right-3 top-2 text-[10px] font-medium text-slate-400 uppercase">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[80vh] flex flex-col">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Avaliação Física & Bioimpedância</h3>
          <p className="text-xs text-slate-500">Insira os dados para calibração do algoritmo de treino</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Basic Data */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Dados Básicos</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputGroup label="Peso" name="weight" unit="kg" placeholder="80.0" onChange={handleBasicChange} />
            <InputGroup label="Altura" name="height" unit="cm" placeholder="175" onChange={handleBasicChange} />
            <InputGroup label="% Gordura (BF)" name="bodyFat" unit="%" placeholder="15" onChange={handleBasicChange} />
          </div>
          <div className="mt-4">
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Nível de Atividade</label>
            <select
              name="currentActivityLevel"
              onChange={handleBasicChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
            >
              <option value="Sedentário">Sedentário</option>
              <option value="Levemente Ativo">Levemente Ativo</option>
              <option value="Moderadamente Ativo">Moderadamente Ativo</option>
              <option value="Muito Ativo">Muito Ativo</option>
              <option value="Atleta">Atleta / Treino intenso</option>
            </select>
          </div>
        </section>

        {/* Bioimpedance Section */}
        <section className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">Bioimpedância Avançada</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <InputGroup label="Massa Muscular" name="muscleMass" unit="kg" placeholder="35" onChange={handleBioChange} />
            <InputGroup label="Água Corporal" name="bodyWater" unit="%" placeholder="60" onChange={handleBioChange} />
            <InputGroup label="Gordura Visceral" name="visceralFat" unit="Nível" placeholder="5" onChange={handleBioChange} />
            <InputGroup label="Taxa Metabólica" name="bmr" unit="kcal" placeholder="1800" onChange={handleBioChange} />
            <InputGroup label="Massa Óssea" name="boneMass" unit="kg" placeholder="3.5" onChange={handleBioChange} />
          </div>
        </section>

        {/* Anthropometry / Measurements */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Perimetria (Circunferências)</h4>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <InputGroup label="Pescoço" name="neck" onChange={handleMeasurementChange} />
            <InputGroup label="Tórax" name="chest" onChange={handleMeasurementChange} />
            <InputGroup label="Cintura" name="waist" onChange={handleMeasurementChange} />
            <InputGroup label="Abdômen" name="abdomen" onChange={handleMeasurementChange} />
            <InputGroup label="Quadril" name="hips" onChange={handleMeasurementChange} />
            <InputGroup label="Bíceps (D)" name="rightBiceps" onChange={handleMeasurementChange} />
            <InputGroup label="Bíceps (E)" name="leftBiceps" onChange={handleMeasurementChange} />
            <InputGroup label="Coxa (D)" name="rightThigh" onChange={handleMeasurementChange} />
            <InputGroup label="Coxa (E)" name="leftThigh" onChange={handleMeasurementChange} />
            <InputGroup label="Panturrilha (D)" name="rightCalf" onChange={handleMeasurementChange} />
            <InputGroup label="Panturrilha (E)" name="leftCalf" onChange={handleMeasurementChange} />
          </div>
        </section>

        {/* Clinical Info */}
        <section>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1 h-4 bg-red-500 rounded-full"></div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Observações Clínicas</h4>
          </div>
          <textarea
            name="injuries"
            onChange={handleBasicChange}
            placeholder="Lesões, patologias ou restrições articulares..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm h-20"
          ></textarea>
        </section>
      </form>

      <div className="p-4 border-t border-slate-100 bg-white flex justify-end space-x-3">
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
        >
          Confirmar Dados da Avaliação
        </button>
      </div>
    </div>
  );
};

export default AssessmentForm;
