
import { GoogleGenAI, Type } from "@google/genai";
import { PhysicalAssessment, WorkoutPlan, WorkoutConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const WORKOUT_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    goal: { type: Type.STRING },
    level: { type: Type.STRING },
    split: { type: Type.STRING },
    frequency: { type: Type.NUMBER },
    periodization: { type: Type.STRING },
    coachNotes: { type: Type.STRING },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                exerciseId: { type: Type.STRING },
                name: { type: Type.STRING },
                sets: { type: Type.NUMBER },
                reps: { type: Type.STRING },
                rest: { type: Type.STRING },
                rpe: { type: Type.NUMBER },
                rir: { type: Type.NUMBER },
                notes: { type: Type.STRING },
                loadSuggestion: { type: Type.STRING }
              },
              required: ["name", "sets", "reps", "rest"]
            }
          }
        },
        required: ["name", "exercises"]
      }
    }
  },
  required: ["title", "goal", "level", "split", "days"]
};

export async function generateWorkout(
  command: string, 
  config: WorkoutConfig,
  assessment?: PhysicalAssessment
): Promise<WorkoutPlan> {
  const assessmentContext = assessment ? `
    AVALIAÇÃO FÍSICA E BIOIMPEDÂNCIA DO ALUNO:
    - Peso: ${assessment.weight}kg | Altura: ${assessment.height}cm | BF: ${assessment.bodyFat || 'N/A'}%
    - Bioimpedância: Massa Muscular: ${assessment.bioimpedance?.muscleMass || 'N/A'}kg, Água: ${assessment.bioimpedance?.bodyWater || 'N/A'}%, Gordura Visceral: ${assessment.bioimpedance?.visceralFat || 'N/A'}, TMB: ${assessment.bioimpedance?.bmr || 'N/A'}kcal
    - Perimetria: Cintura: ${assessment.measurements?.waist || '-'}cm, Tórax: ${assessment.measurements?.chest || '-'}cm, Coxa: ${assessment.measurements?.rightThigh || '-'}cm
    - Nível de Atividade: ${assessment.currentActivityLevel}
    - Restrições/Lesões: ${assessment.injuries || 'Nenhuma'}
  ` : 'Nenhuma avaliação física fornecida.';

  const prompt = `
    Você é o sistema inteligente do aplicativo BRUSFIT PRO. Sua função é criar treinos personalizados baseados na ciência do treinamento físico.

    Sua missão é utilizar:
    - Biblioteca com mais de 500 exercícios.
    - Objetivos definidos pelo usuário: ${command}.
    - Nível de experiência e parâmetros técnicos: ${config.periodization}, ${config.priority}, ${config.exerciseCount} exercícios.
    - Ambiente e equipamentos conforme o contexto do comando ou padrão academia.

    Sempre gere:
    - Lista de exercícios coerente com o objetivo.
    - Séries, repetições e descanso adaptativos.
    - Observações técnicas precisas (Ex: "Foco na cadência 3010", "Atenção à retração escapular").
    - Ajustes automáticos conforme objetivo (RIR para hipertrofia, RPE para força).

    Priorize segurança, progressão e resultados.

    COMANDO DO USUÁRIO: "${command}"

    DIRETRIZES DE INTELIGÊNCIA:
    1. Se for comando de AJUSTE (Ex: "Aplicar deload"), reduza o volume e intensidade significativamente.
    2. Se for comando de ANÁLISE (Ex: "Detectar fadiga"), utilize as notas do coach e os dados de bioimpedância para sugerir mudanças.
    3. Para "Emagrecimento", priorize densidade de treino (descansos curtos, circuitos).
    4. Para "Força", priorize intensidade e recuperação (descansos longos, cargas >85% 1RM).
    5. Periodização: ${config.periodization} (Linear, Ondulatória ou Angular).

    ${assessmentContext}

    Retorne o treino em JSON estruturado conforme o esquema fornecido.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: WORKOUT_SCHEMA,
    },
  });

  const rawJson = JSON.parse(response.text || '{}');
  return {
    ...rawJson,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  } as WorkoutPlan;
}
