import { useState, useEffect } from 'react';
import { BalloonAnimation } from './components/BalloonAnimation';
import { BirthdayCake } from './components/BirthdayCake';
import { MessageEnvelope } from './components/MessageEnvelope';
import { ConfettiExplosion } from './components/ConfettiExplosion';
import { AudioManager } from './components/AudioManager';
import { PhotoGallery } from './components/PhotoGallery';
import { SocialShare } from './components/SocialShare';
import { InteractiveElements } from './components/InteractiveElements';

type Stage = 'balloons' | 'cake' | 'cake-cutting' | 'envelope' | 'message' | 'interactive' | 'gallery' | 'complete';

export default function App() {
  const [stage, setStage] = useState<Stage>('balloons');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showInteractive, setShowInteractive] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Auto-progress from balloons to cake after 4 seconds (more time to enjoy)
  useEffect(() => {
    if (stage === 'balloons') {
      const timer = setTimeout(() => setStage('cake'), 4000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleCandleBlown = () => {
    setStage('cake-cutting');
    // After cake cutting animation, show envelope
    setTimeout(() => setStage('envelope'), 2500);
  };

  const handleEnvelopeOpened = () => {
    setStage('message');
    setShowConfetti(true);
    // Hide confetti and show interactive elements after 5 seconds
    setTimeout(() => {
      setShowConfetti(false);
      setStage('interactive');
      setShowInteractive(true);
    }, 5000);
  };

  const handleInteractiveComplete = () => {
    setShowInteractive(false);
    setStage('gallery');
    setShowGallery(true);
  };

  const handleGalleryComplete = () => {
    setShowGallery(false);
    setStage('complete');
  };

  const enableAudio = () => {
    setAudioEnabled(true);
  };

  const restartExperience = () => {
    setStage('balloons');
    setShowConfetti(false);
    setShowGallery(false);
    setShowInteractive(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-purple-200 relative overflow-hidden flex items-center justify-center">
      {/* Audio Manager */}
      {audioEnabled && <AudioManager stage={stage} />}
      
      {/* Audio Enable Button */}
      {!audioEnabled && (
        <button
          onClick={enableAudio}
          className="fixed top-4 right-4 z-50 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all transform hover:scale-105"
        >
          🔊 Enable Audio
        </button>
      )}
      
      {/* Stage indicator */}
      <div className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        <div className="flex space-x-2">
          {['balloons', 'cake', 'envelope', 'message', 'interactive', 'gallery', 'complete'].map((s, index) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                ['balloons', 'cake', 'cake-cutting', 'envelope', 'message', 'interactive', 'gallery', 'complete'].indexOf(stage) >= index
                  ? 'bg-purple-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Always show balloon animation in background (except during interactive games) */}
      {!showInteractive && <BalloonAnimation />}
      
      {/* Interactive Elements Overlay */}
      {showInteractive && (
        <InteractiveElements onComplete={handleInteractiveComplete} />
      )}
      
      {/* Photo Gallery Overlay */}
      {showGallery && (
        <PhotoGallery onComplete={handleGalleryComplete} />
      )}
      
      {/* Stage-specific content */}
      {!showInteractive && !showGallery && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4">
          {/* Initial greeting */}
          {stage === 'balloons' && (
            <div className="text-center animate-fade-in">
              <h1 className="text-6xl md:text-8xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 font-bold">
                Happy Birthday!
              </h1>
              <p className="text-3xl md:text-4xl text-purple-700 mb-4">
                Eda Saner ✨
              </p>
              <p className="text-lg md:text-xl text-purple-600 animate-pulse">
                A magical experience awaits... 🎉
              </p>
            </div>
          )}

          {/* Cake stage */}
          {(stage === 'cake' || stage === 'cake-cutting') && (
            <BirthdayCake 
              onCandleBlown={handleCandleBlown}
              isCutting={stage === 'cake-cutting'}
            />
          )}

          {/* Envelope and message stage */}
          {(stage === 'envelope' || stage === 'message') && (
            <MessageEnvelope 
              onEnvelopeOpened={handleEnvelopeOpened}
              showMessage={stage === 'message'}
            />
          )}
          
          {/* Final stage with social sharing */}
          {stage === 'complete' && (
            <div className="text-center animate-fade-in space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-6xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                  🎉 Magical Celebration Complete! 🎉
                </h2>
                <p className="text-xl md:text-2xl text-purple-700 leading-relaxed">
                  Hope you loved this enchanting birthday experience, Eda!<br />
                  You deserve all the magic in the world! ✨💖
                </p>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                  <p className="text-lg text-gray-700 mb-2">
                    🌟 Interactive games completed
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    📸 Memory gallery explored
                  </p>
                  <p className="text-lg text-gray-700">
                    💖 Birthday wishes captured forever
                  </p>
                </div>
              </div>
              
              <SocialShare />
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowInteractive(true)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  🎮 Play Games Again
                </button>
                <button
                  onClick={() => setShowGallery(true)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  📸 View Gallery Again
                </button>
                <button
                  onClick={restartExperience}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  🔄 Restart Experience
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Confetti explosion */}
      {showConfetti && <ConfettiExplosion />}
    </div>
  );
}