
import React from 'react';
import { Exercise, Goal, Level, Environment } from './types';

export const COLORS = {
  primary: '#0066cc',
  secondary: '#334155',
  accent: '#3b82f6',
  light: '#f8fafc',
  white: '#ffffff',
};

export const INITIAL_EXERCISES: Exercise[] = [
  { id: '1', name: 'Supino Reto com Barra', muscleGroup: 'Peito', equipment: 'Barra', environment: 'Academia' },
  { id: '2', name: 'Agachamento Livre', muscleGroup: 'Pernas', equipment: 'Barra', environment: 'Academia' },
  { id: '3', name: 'Levantamento Terra', muscleGroup: 'Costas/Pernas', equipment: 'Barra', environment: 'Academia' },
  { id: '4', name: 'Desenvolvimento Militar', muscleGroup: 'Ombros', equipment: 'Barra', environment: 'Academia' },
  { id: '5', name: 'Remada Curvada', muscleGroup: 'Costas', equipment: 'Barra', environment: 'Academia' },
  { id: '6', name: 'Rosca Direta', muscleGroup: 'Bíceps', equipment: 'Barra', environment: 'Academia' },
  { id: '7', name: 'Tríceps Testa', muscleGroup: 'Tríceps', equipment: 'Haltere', environment: 'Academia' },
  { id: '8', name: 'Cadeira Extensora', muscleGroup: 'Pernas', equipment: 'Máquina', environment: 'Academia' },
  { id: '9', name: 'Flexão de Braços', muscleGroup: 'Peito', equipment: 'Peso Corporal', environment: 'Casa' },
  { id: '10', name: 'Afundo', muscleGroup: 'Pernas', equipment: 'Peso Corporal', environment: 'Casa' },
  { id: '11', name: 'Prancha Abdominal', muscleGroup: 'Core', equipment: 'Peso Corporal', environment: 'Casa' },
  { id: '12', name: 'Puxada Aberta', muscleGroup: 'Costas', equipment: 'Máquina', environment: 'Academia' },
  { id: '13', name: 'Leg Press 45', muscleGroup: 'Pernas', equipment: 'Máquina', environment: 'Academia' },
  { id: '14', name: 'Elevação Lateral', muscleGroup: 'Ombros', equipment: 'Haltere', environment: 'Academia' },
  { id: '15', name: 'Supino Inclinado com Halteres', muscleGroup: 'Peito', equipment: 'Haltere', environment: 'Academia' },
];

export const GOALS: Goal[] = ['Hipertrofia', 'Emagrecimento', 'Condicionamento', 'Força', 'Resistência', 'Saúde'];
export const LEVELS: Level[] = ['Iniciante', 'Intermediário', 'Avançado'];
export const ENVIRONMENTS: Environment[] = ['Academia', 'Casa'];
