import { useState, useEffect } from 'react';

interface MessageEnvelopeProps {
  onEnvelopeOpened: () => void;
  showMessage: boolean;
}

export function MessageEnvelope({ onEnvelopeOpened, showMessage }: MessageEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);

  const inspirationalQuotes = [
    "✨ \"Your kindness lights up every room you enter\" ✨",
    "💫 \"You make ordinary moments extraordinary\" 💫", 
    "🌟 \"The world is brighter because you're in it\" 🌟",
    "💖 \"Your smile has the power to heal hearts\" 💖"
  ];

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % inspirationalQuotes.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showMessage, inspirationalQuotes.length]);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(onEnvelopeOpened, 1200);
    }
  };

  return (
    <div className="relative animate-fade-in flex flex-col items-center">
      {!showMessage && (
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            A Special Message Awaits! 💌
          </h2>
          <p className="text-lg text-purple-700 mb-2">
            Someone wrote something beautiful just for you, Eda...
          </p>
          <p className="text-md text-purple-600">
            Click the envelope to discover your heartfelt message ✨
          </p>
        </div>
      )}

      <div className="relative mx-auto" style={{ perspective: '1000px' }}>
        {/* Envelope */}
        <div
          onClick={handleEnvelopeClick}
          className={`relative w-80 h-56 md:w-96 md:h-64 cursor-pointer transition-all duration-1200 transform hover:scale-105 ${
            isOpened ? 'rotate-x-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Envelope Body */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100 rounded-lg shadow-2xl border-2 border-purple-200">
            {/* Decorative border pattern */}
            <div className="absolute inset-4 border-2 border-dashed border-purple-300 rounded-lg opacity-60"></div>
            
            {/* Envelope flap */}
            <div
              className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-purple-200 via-pink-200 to-purple-200 transition-transform duration-1200 origin-top shadow-lg ${
                isOpened ? 'rotate-x-180' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 80%)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Wax seal */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-lg border-2 border-red-800">
                <div className="absolute inset-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full">
                  <div className="absolute inset-2 text-white text-sm flex items-center justify-center font-bold">
                    🎂
                  </div>
                </div>
              </div>
            </div>

            {/* Address label */}
            <div className="absolute bottom-16 left-6 right-6 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-purple-200">
                <p className="text-sm text-purple-800 font-medium">To:</p>
                <p className="text-lg text-purple-900 font-bold">Eda Saner</p>
                <p className="text-xs text-purple-600">The Most Amazing Person ✨</p>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-3 left-3 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Love stamps */}
            <div className="absolute top-6 right-8 w-8 h-8 bg-purple-300 rounded border-2 border-purple-500 flex items-center justify-center text-xs">
              💜
            </div>
          </div>
        </div>

        {/* Message Content */}
        {showMessage && (
          <div className="absolute inset-0 flex items-center justify-center animate-message-reveal">
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border-2 border-purple-200 max-w-lg text-center relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 text-4xl">🌸</div>
                <div className="absolute top-8 right-6 text-3xl">✨</div>
                <div className="absolute bottom-6 left-6 text-3xl">💫</div>
                <div className="absolute bottom-4 right-4 text-4xl">🌺</div>
              </div>
              
              <div className="relative z-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="text-7xl mb-6 animate-bounce-slow">🎉</div>
                  <h3 className="text-3xl md:text-4xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 font-bold">
                    Happy Birthday, Beautiful Eda! 💖
                  </h3>
                </div>
                
                {/* Main message */}
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p className="text-xl font-medium text-purple-800">
                    Dear Wonderful Eda,
                  </p>
                  
                  <p className="text-lg">
                    On this incredibly special day, I want you to know just how <span className="text-purple-600 font-semibold">extraordinary</span> you are! 
                  </p>
                  
                  <p className="text-lg">
                    Your <span className="text-pink-600 font-semibold">radiant smile</span> has the power to brighten even the cloudiest days, and your <span className="text-purple-600 font-semibold">kind heart</span> touches everyone who is lucky enough to know you.
                  </p>
                  
                  <p className="text-lg">
                    May this new year of your life be filled with <span className="text-pink-600 font-semibold">endless adventures</span>, <span className="text-purple-600 font-semibold">beautiful moments</span>, and all the <span className="text-pink-600 font-semibold">dreams coming true</span> that you so deeply deserve! 
                  </p>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 my-6">
                    <p className="text-lg italic text-purple-800 transition-all duration-500">
                      {inspirationalQuotes[currentQuote]}
                    </p>
                  </div>
                  
                  <p className="text-lg">
                    Keep shining your beautiful light, Eda. The world is infinitely better with you in it! 🌟
                  </p>
                  
                  <p className="text-xl text-purple-700 font-semibold italic mt-8">
                    With all my love and warmest birthday wishes! 💜✨
                  </p>
                </div>

                {/* Animated elements */}
                <div className="mt-10 flex justify-center space-x-4">
                  <span className="text-3xl animate-bounce">🎈</span>
                  <span className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎂</span>
                  <span className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎁</span>
                  <span className="text-3xl animate-bounce" style={{ animationDelay: '0.6s' }}>✨</span>
                  <span className="text-3xl animate-bounce" style={{ animationDelay: '0.8s' }}>💖</span>
                </div>
                
                {/* Birthday wishes */}
                <div className="mt-8 text-sm text-purple-600 opacity-80">
                  <p>Made with 💜 especially for Eda's special day</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}