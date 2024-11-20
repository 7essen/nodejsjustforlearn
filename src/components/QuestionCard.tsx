import React, { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const QuestionCard = () => {
  const { questions, currentQuestion, handleAnswer } = useGameStore();
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center">
        <AlertCircle className="w-16 h-16 text-yellow-300 mx-auto mb-4" />
        <p className="text-white text-xl">عفواً، حدث خطأ في تحميل السؤال</p>
      </div>
    );
  }

  const handleChoice = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    setTimeout(() => {
      handleAnswer(index);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 space-y-6">
      <div className="text-center">
        <div className="bg-white/90 text-black px-3 py-1 rounded-full inline-block">
          سؤال {currentQuestion + 1}/5
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white text-center">
        {question.question}
      </h2>

      <div className="grid gap-4">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => !showExplanation && handleChoice(index)}
            disabled={showExplanation}
            className={`p-4 rounded-lg text-white text-right transition-all duration-200
              ${selectedAnswer === index 
                ? selectedAnswer === question.correctAnswer
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : 'bg-white/5 hover:bg-white/20'
              }
              ${showExplanation && index === question.correctAnswer ? 'bg-green-500' : ''}
              disabled:cursor-not-allowed`}
          >
            {choice}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="bg-white/20 p-4 rounded-lg text-white">
          <p className="text-lg">{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;