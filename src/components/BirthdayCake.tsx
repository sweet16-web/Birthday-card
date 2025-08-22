import { useState } from 'react';

interface BirthdayCakeProps {
  onCandleBlown: () => void;
  isCutting: boolean;
}

export function BirthdayCake({ onCandleBlown, isCutting }: BirthdayCakeProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [candleFlicker, setCandleFlicker] = useState(true);

  const handleCandleBlow = () => {
    if (!isBlown) {
      setIsBlown(true);
      setCandleFlicker(false);
      setTimeout(() => {
        onCandleBlown();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Make a Wish, Eda! 🎂
        </h2>
        <p className="text-lg text-purple-700">
          {!isBlown ? 'Click the candle to blow it out!' : 'Wish made! Time to cut the cake! ✨'}
        </p>
      </div>

      <div className={`relative ${isCutting ? 'animate-cake-cut' : ''}`}>
        {/* Cake Base */}
        <div className="relative">
          {/* Bottom Layer */}
          <div className="w-80 h-32 bg-gradient-to-b from-amber-200 to-amber-400 rounded-3xl shadow-2xl border-4 border-amber-300">
            <div className="absolute inset-2 bg-gradient-to-b from-amber-100 to-amber-200 rounded-2xl">
              {/* Decorative frosting waves */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-pink-200 rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-white via-pink-300 to-pink-300 rounded-t-2xl opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Middle Layer */}
          <div className="absolute -top-6 left-8 right-8 w-64 h-28 bg-gradient-to-b from-pink-200 to-pink-400 rounded-3xl shadow-xl border-4 border-pink-300">
            <div className="absolute inset-2 bg-gradient-to-b from-pink-100 to-pink-200 rounded-2xl">
              <div className="absolute top-0 left-0 right-0 h-4 bg-purple-200 rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 via-white via-purple-300 to-purple-300 rounded-t-2xl opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Top Layer */}
          <div className="absolute -top-12 left-16 right-16 w-48 h-24 bg-gradient-to-b from-purple-200 to-purple-400 rounded-3xl shadow-xl border-4 border-purple-300">
            <div className="absolute inset-2 bg-gradient-to-b from-purple-100 to-purple-200 rounded-2xl">
              <div className="absolute top-0 left-0 right-0 h-3 bg-yellow-200 rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-white via-yellow-300 to-yellow-300 rounded-t-2xl opacity-60"></div>
              </div>
            </div>
          </div>

          {/* Candle */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="w-3 h-8 bg-gradient-to-b from-red-400 to-red-600 rounded-t-full shadow-md">
              {/* Candle highlight */}
              <div className="absolute left-1 top-1 w-1 h-6 bg-red-200 rounded-full opacity-60"></div>
            </div>
            
            {/* Flame */}
            {!isBlown && (
              <div 
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 cursor-pointer ${candleFlicker ? 'animate-wiggle' : ''}`}
                onClick={handleCandleBlow}
              >
                <div className="relative">
                  <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full opacity-90 animate-pulse">
                    <div className="absolute inset-1 bg-gradient-to-t from-red-400 via-orange-300 to-yellow-100 rounded-full opacity-80"></div>
                  </div>
                  {/* Inner flame */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-gradient-to-t from-blue-400 via-white to-transparent rounded-full opacity-70"></div>
                </div>
              </div>
            )}

            {/* Blown effect */}
            {isBlown && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="text-2xl animate-bounce">💨</div>
              </div>
            )}
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</div>
          <div className="absolute top-8 right-6 text-xl animate-bounce" style={{ animationDelay: '1s' }}>✨</div>
          <div className="absolute bottom-8 left-12 text-lg animate-bounce" style={{ animationDelay: '1.5s' }}>🎈</div>
          <div className="absolute bottom-4 right-16 text-xl animate-bounce" style={{ animationDelay: '2s' }}>💖</div>

          {/* Cake slices (shown during cutting) */}
          {isCutting && (
            <>
              <div className="absolute bottom-0 left-20 w-16 h-16 bg-amber-300 transform rotate-12 animate-slice">
                <div className="w-full h-full bg-gradient-to-t from-amber-400 to-amber-200 rounded-lg"></div>
              </div>
              <div className="absolute bottom-0 right-24 w-14 h-14 bg-pink-300 transform -rotate-6 animate-slice" style={{ animationDelay: '0.3s' }}>
                <div className="w-full h-full bg-gradient-to-t from-pink-400 to-pink-200 rounded-lg"></div>
              </div>
            </>
          )}
        </div>

        {/* Sparkles around cake */}
        <div className="absolute -inset-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400 animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-purple-600 text-lg">
          {!isBlown ? '🕯️ Make your special wish...' : '🎉 Time to celebrate!'}
        </p>
      </div>
    </div>
  );
}