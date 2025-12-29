
export type Goal = 'Hipertrofia' | 'Emagrecimento' | 'Condicionamento' | 'Força' | 'Resistência' | 'Saúde';
export type Level = 'Iniciante' | 'Intermediário' | 'Avançado';
export type Environment = 'Academia' | 'Casa';
export type PeriodizationType = 'Linear' | 'Ondulatória' | 'Angular';
export type Split = 'Full Body' | 'AB' | 'ABC' | 'ABCD' | 'ABCDE';

export interface WorkoutConfig {
  muscleGroups: string[];
  exerciseCount: number;
  priority: 'Básicos/Multiarticulares' | 'Isoladores' | 'Equilibrado';
  periodization: PeriodizationType;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  environment: Environment;
}

export interface WorkoutExercise {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  rpe?: number;
  rir?: number;
  notes?: string;
  loadSuggestion?: string;
}

export interface TrainingDay {
  name: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  goal: Goal;
  level: Level;
  split: Split;
  frequency: number;
  periodization: PeriodizationType;
  days: TrainingDay[];
  coachNotes: string;
  createdAt: string;
}

export interface Bioimpedance {
  muscleMass?: number;
  bodyWater?: number;
  visceralFat?: number;
  bmr?: number; // Basal Metabolic Rate
  boneMass?: number;
}

export interface Measurements {
  neck?: number;
  chest?: number;
  waist?: number;
  abdomen?: number;
  hips?: number;
  rightBiceps?: number;
  leftBiceps?: number;
  rightThigh?: number;
  leftThigh?: number;
  rightCalf?: number;
  leftCalf?: number;
}

export interface PhysicalAssessment {
  weight: number;
  height: number;
  bodyFat?: number;
  bioimpedance?: Bioimpedance;
  measurements?: Measurements;
  injuries?: string;
  currentActivityLevel: string;
  observations?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  assessment?: PhysicalAssessment;
  activePlanId?: string;
}
