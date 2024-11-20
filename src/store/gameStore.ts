import { create } from 'zustand';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyAPWCaVZSBP2qb2zECwZzWiRMfAYixrzCc');

interface Question {
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
}

interface GameState {
  questions: Question[];
  currentQuestion: number;
  score: number;
  lives: number;
  isLoading: boolean;
  isGameOver: boolean;
  fetchQuestions: () => Promise<void>;
  handleAnswer: (choiceIndex: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  score: 0,
  lives: 3,
  isLoading: false,
  isGameOver: false,

  fetchQuestions: async () => {
    set({ isLoading: true });
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Generate 5 questions in Arabic about Egyptian culture, history, or general knowledge. For each question:
      1. Make the question interesting and engaging
      2. Provide 4 possible answers
      3. Mark the correct answer (0-3)
      4. Add a brief explanation for the correct answer
      Format: { question, choices: [], correctAnswer, explanation }
      Return an array of 5 questions.`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      const questions = JSON.parse(response);
      set({ questions, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      set({ isLoading: false, isGameOver: true });
    }
  },

  handleAnswer: (choiceIndex: number) => {
    const { questions, currentQuestion, lives, score } = get();
    const isCorrect = choiceIndex === questions[currentQuestion].correctAnswer;

    if (isCorrect) {
      set({ score: score + 100 });
    } else {
      const newLives = lives - 1;
      set({ 
        lives: newLives,
        isGameOver: newLives <= 0
      });
    }

    if (currentQuestion < questions.length - 1) {
      set({ currentQuestion: currentQuestion + 1 });
    } else {
      set({ isGameOver: true });
    }
  },

  resetGame: () => {
    set({
      currentQuestion: 0,
      score: 0,
      lives: 3,
      isGameOver: false,
      isLoading: false
    });
    get().fetchQuestions();
  }
}));