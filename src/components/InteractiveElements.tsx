import { useState, useEffect } from 'react';
import { Heart, Star, Gift, Sparkles, Zap } from 'lucide-react';

interface InteractiveElementsProps {
  onComplete: () => void;
}

export function InteractiveElements({ onComplete }: InteractiveElementsProps) {
  const [currentGame, setCurrentGame] = useState<'wishes' | 'quiz' | 'giftbox' | 'complete'>('wishes');
  const [wishes, setWishes] = useState<string[]>([]);
  const [currentWish, setCurrentWish] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [giftOpened, setGiftOpened] = useState(false);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number}>>([]);

  const wishPrompts = [
    "✨ What's your biggest dream for this year?",
    "💫 What adventure would you love to go on?", 
    "🌟 What skill would you like to master?",
    "💖 What would make you happiest right now?",
    "🎯 What goal excites you the most?"
  ];

  const quizQuestions = [
    {
      question: "What makes Eda's smile so special?",
      answers: ["It lights up any room", "It's contagious and spreads joy", "It comes from her beautiful heart", "All of the above! ✨"],
      correct: 3
    },
    {
      question: "What's Eda's superpower?",
      answers: ["Making everyone feel loved", "Bringing out the best in people", "Creating magical moments", "All of these amazing things! 💫"],
      correct: 3
    },
    {
      question: "How does Eda make the world better?",
      answers: ["With her kindness", "Through her positive energy", "By being authentically wonderful", "In every possible way! 🌟"],
      correct: 3
    }
  ];

  const generateStars = () => {
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setStars(newStars);
  };

  useEffect(() => {
    generateStars();
  }, []);

  const handleWishSubmit = () => {
    if (currentWish.trim()) {
      setWishes([...wishes, currentWish.trim()]);
      setCurrentWish('');
      
      if (wishes.length >= 2) {
        setTimeout(() => setCurrentGame('quiz'), 1000);
      }
    }
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    setTimeout(() => {
      if (answerIndex === quizQuestions[currentQuestion].correct) {
        setQuizScore(quizScore + 1);
      }
      
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setTimeout(() => setCurrentGame('giftbox'), 1000);
      }
    }, 1500);
  };

  const handleGiftOpen = () => {
    setGiftOpened(true);
    setTimeout(() => {
      setCurrentGame('complete');
      setTimeout(() => onComplete(), 3000);
    }, 2000);
  };

  if (currentGame === 'wishes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background stars */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute text-yellow-300 opacity-60 animate-pulse"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              animationDelay: `${star.id * 0.1}s`
            }}
          >
            ⭐
          </div>
        ))}

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce-slow">🌟</div>
            <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 font-bold">
              Birthday Wish Maker
            </h2>
            <p className="text-lg text-gray-700">
              Before we continue, let's capture some magical wishes for Eda's special year ahead! ✨
            </p>
          </div>

          <div className="space-y-6">
            {wishes.map((wish, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <Star className="text-purple-500 flex-shrink-0" size={20} />
                  <p className="text-gray-700 italic">"{wish}"</p>
                </div>
              </div>
            ))}

            {wishes.length < 3 && (
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-lg text-purple-700 mb-4">
                    {wishPrompts[wishes.length]}
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={currentWish}
                    onChange={(e) => setCurrentWish(e.target.value)}
                    placeholder="Share your wish for Eda..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleWishSubmit()}
                  />
                  <button
                    onClick={handleWishSubmit}
                    disabled={!currentWish.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles size={20} />
                  </button>
                </div>
              </div>
            )}

            {wishes.length >= 3 && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 mb-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="text-lg text-green-800 font-medium">
                    Beautiful wishes captured! Let's continue the celebration...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentGame === 'quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 max-w-2xl w-full animate-fade-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 font-bold">
              Eda Appreciation Quiz
            </h2>
            <p className="text-lg text-gray-700">
              Let's celebrate what makes Eda so amazing! 💖
            </p>
            <div className="mt-4">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quizQuestions.length} • Score: {quizScore}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl text-gray-800 mb-6 font-medium">
                {quizQuestions[currentQuestion].question}
              </h3>
            </div>

            <div className="grid gap-4">
              {quizQuestions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`p-4 rounded-xl text-left transition-all transform hover:scale-105 ${
                    selectedAnswer === index
                      ? index === quizQuestions[currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : selectedAnswer !== null && index === quizQuestions[currentQuestion].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-gray-700'
                  }`}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentGame === 'giftbox') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-red-100 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 max-w-2xl w-full animate-fade-in text-center">
          <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-8 font-bold">
            Special Surprise for Eda! 🎁
          </h2>

          <div className="mb-8">
            <div 
              onClick={handleGiftOpen}
              className={`mx-auto w-48 h-48 cursor-pointer transition-all duration-1000 ${
                giftOpened ? 'animate-bounce' : 'hover:scale-105'
              }`}
            >
              {!giftOpened ? (
                <div className="relative">
                  <div className="w-48 h-48 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-2xl">
                    <div className="absolute inset-x-0 top-1/2 h-6 bg-gradient-to-r from-yellow-400 to-yellow-500 transform -translate-y-1/2"></div>
                    <div className="absolute inset-y-0 left-1/2 w-6 bg-gradient-to-b from-yellow-400 to-yellow-500 transform -translate-x-1/2"></div>
                    <div className="absolute top-4 left-1/2 w-12 h-8 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-lg transform -translate-x-1/2"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white text-6xl animate-pulse">
                    🎁
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-8xl animate-bounce">🌟</div>
                  <div className="text-6xl">💖</div>
                  <div className="text-4xl">✨ 🎉 ✨</div>
                </div>
              )}
            </div>
          </div>

          {!giftOpened ? (
            <p className="text-lg text-gray-700">
              Click the gift box to reveal Eda's special surprise! 🎁✨
            </p>
          ) : (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-2xl text-purple-700 font-bold">
                Your Virtual Birthday Crown! 👑
              </h3>
              <p className="text-lg text-gray-700">
                Because every birthday queen deserves her crown! 
              </p>
              <p className="text-base text-purple-600">
                Wear it with pride today, beautiful Eda! ✨
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentGame === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 max-w-2xl w-full animate-fade-in text-center">
          <div className="text-8xl mb-6 animate-bounce-slow">🎉</div>
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 font-bold">
            Games Complete!
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Thanks for making Eda's birthday even more special with these fun activities! 💖
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Your Quiz Results:</h3>
            <p className="text-2xl text-purple-600 font-bold">{quizScore} / {quizQuestions.length} Perfect! ⭐</p>
            <p className="text-sm text-gray-600 mt-2">You clearly know how amazing Eda is! 💫</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}