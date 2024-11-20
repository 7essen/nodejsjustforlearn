import React, { useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import StatusBar from './StatusBar';
import QuestionCard from './QuestionCard';
import GameOver from './GameOver';
import LoadingScreen from './LoadingScreen';

const HomePage = () => {
  const { isGameOver, isLoading, fetchQuestions } = useGameStore();

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (isGameOver) {
    return <GameOver />;
  }

  if (isLoading && !isGameOver) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="max-w-2xl mx-auto">
        <StatusBar />
        <QuestionCard />
      </div>
    </div>
  );
};

export default HomePage;