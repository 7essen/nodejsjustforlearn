import React from 'react';
import { Trophy, Heart } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const StatusBar = () => {
  const { score, lives } = useGameStore();

  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-white/10 backdrop-blur-lg rounded-lg">
      <div className="flex items-center gap-2">
        <Trophy className="text-yellow-300" />
        <span className="text-white text-xl">{score}</span>
      </div>
      <div className="flex items-center gap-1">
        {[...Array(lives)].map((_, i) => (
          <Heart key={i} className="text-red-500" fill="currentColor" />
        ))}
      </div>
    </div>
  );
}

export default StatusBar;