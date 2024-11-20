import React from 'react';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const GameOver = () => {
  const { score, resetGame } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-600 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <Trophy className="w-20 h-20 mx-auto text-yellow-300" />
        <h1 className="text-3xl font-bold text-white">انتهت اللعبة!</h1>
        <p className="text-2xl text-white">النتيجة: {score}</p>
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
        >
          العب تاني 🎮
        </button>
      </div>
    </div>
  );
}

export default GameOver;