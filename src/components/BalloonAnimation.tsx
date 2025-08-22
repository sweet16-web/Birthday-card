import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  left: number;
  startBottom: number;
  animationDelay: number;
  color: string;
  size: number;
  duration: number;
  swayDirection: number;
  swayIntensity: number;
  zIndex: number;
  opacity: number;
  rotationSpeed: number;
  entryType: 'bottom' | 'left' | 'right';
  isPopped: boolean;
  popX?: number;
  popY?: number;
}

export function BalloonAnimation() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    const colors = [
      'bg-gradient-to-b from-purple-300 to-purple-500',
      'bg-gradient-to-b from-pink-300 to-pink-500',
      'bg-gradient-to-b from-violet-300 to-violet-500',
      'bg-gradient-to-b from-fuchsia-300 to-fuchsia-500',
      'bg-gradient-to-b from-rose-300 to-rose-500',
      'bg-gradient-to-b from-indigo-300 to-indigo-500',
      'bg-gradient-to-b from-lavender-300 to-lavender-500',
      'bg-gradient-to-b from-purple-400 to-purple-600',
      'bg-gradient-to-b from-pink-400 to-pink-600',
      'bg-gradient-to-b from-violet-400 to-violet-600',
      'bg-gradient-to-b from-cyan-300 to-cyan-500',
      'bg-gradient-to-b from-emerald-300 to-emerald-500',
      'bg-gradient-to-b from-yellow-300 to-yellow-500',
      'bg-gradient-to-b from-orange-300 to-orange-500',
    ];

    const generateBalloons = () => {
      const newBalloons: Balloon[] = [];
      const gridColumns = 12; // More columns for better distribution
      const gridRows = 6; // More rows for continuous flow
      
      // Create balloons with grid-based distribution to ensure scattering
      for (let col = 0; col < gridColumns; col++) {
        for (let row = 0; row < gridRows; row++) {
          // Skip some positions randomly to create natural gaps
          if (Math.random() < 0.3) continue;
          
          const balloonId = Date.now() + (col * gridRows + row) + Math.random() * 1000;
          
          // Base position in grid with random offset
          const baseLeft = (col / gridColumns) * 100;
          const leftVariation = (Math.random() - 0.5) * (100 / gridColumns * 0.7);
          const finalLeft = Math.max(1, Math.min(99, baseLeft + leftVariation));
          
          // Varied entry types for more natural scattering
          const entryTypes: ('bottom' | 'left' | 'right')[] = ['bottom', 'bottom', 'bottom', 'left', 'right'];
          const entryType = entryTypes[Math.floor(Math.random() * entryTypes.length)];
          
          let startBottom = -150 - Math.random() * 300; // Deeper start for better effect
          let startLeft = finalLeft;
          
          if (entryType === 'left') {
            startLeft = -120;
            startBottom = Math.random() * (window.innerHeight || 800) * 0.4;
          } else if (entryType === 'right') {
            startLeft = (window.innerWidth || 1200) + 120;
            startBottom = Math.random() * (window.innerHeight || 800) * 0.4;
          }
          
          newBalloons.push({
            id: balloonId,
            left: startLeft,
            startBottom: startBottom,
            animationDelay: row * 1.5 + Math.random() * 4, // More staggered timing
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 30 + Math.random() * 45, // Good size range for interaction
            duration: 18 + Math.random() * 12, // Longer duration for more interaction time
            swayDirection: Math.random() > 0.5 ? 1 : -1,
            swayIntensity: 15 + Math.random() * 25,
            zIndex: Math.floor(Math.random() * 30),
            opacity: 0.7 + Math.random() * 0.3,
            rotationSpeed: 0.3 + Math.random() * 1.2,
            entryType: entryType,
            isPopped: false,
          });
        }
      }
      
      // Add extra random balloons for continuous coverage
      for (let i = 0; i < 12; i++) {
        const balloonId = Date.now() + 10000 + i + Math.random() * 1000;
        newBalloons.push({
          id: balloonId,
          left: Math.random() * 100,
          startBottom: -100 - Math.random() * 400,
          animationDelay: Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 25 + Math.random() * 55,
          duration: 20 + Math.random() * 15,
          swayDirection: Math.random() > 0.5 ? 1 : -1,
          swayIntensity: 10 + Math.random() * 30,
          zIndex: Math.floor(Math.random() * 25),
          opacity: 0.6 + Math.random() * 0.4,
          rotationSpeed: 0.2 + Math.random() * 1.8,
          entryType: 'bottom',
          isPopped: false,
        });
      }
      
      setBalloons(newBalloons);
    };

    generateBalloons();
    
    // Regenerate balloons more frequently for continuous effect
    const interval = setInterval(() => {
      generateBalloons();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleBalloonClick = (balloonId: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    setBalloons(prev => 
      prev.map(balloon => 
        balloon.id === balloonId 
          ? { ...balloon, isPopped: true, popX: clickX, popY: clickY }
          : balloon
      )
    );

    // Remove popped balloon after animation
    setTimeout(() => {
      setBalloons(prev => prev.filter(balloon => balloon.id !== balloonId));
    }, 800);
  };

  return (
    <div className="fixed inset-0 overflow-hidden z-0" style={{ pointerEvents: 'none' }}>
      {balloons.map((balloon) => {
        // Determine animation name based on entry type
        const getAnimationName = () => {
          switch (balloon.entryType) {
            case 'left':
              return 'floatFromLeft';
            case 'right':
              return 'floatFromRight';
            default:
              return 'floatUp';
          }
        };

        if (balloon.isPopped) {
          return (
            <div
              key={balloon.id}
              className="absolute"
              style={{
                left: balloon.entryType === 'bottom' ? `${balloon.left}%` : `${balloon.left}px`,
                bottom: `${balloon.startBottom}px`,
                zIndex: balloon.zIndex + 100,
                pointerEvents: 'none',
              }}
            >
              {/* Pop effect */}
              <div
                className="absolute text-4xl animate-ping"
                style={{
                  left: balloon.popX || 0,
                  top: balloon.popY || 0,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                💥
              </div>
              {/* Sparkles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-bounce"
                  style={{
                    left: (balloon.popX || 0) + (Math.random() - 0.5) * 80,
                    top: (balloon.popY || 0) + (Math.random() - 0.5) * 80,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.8s',
                  }}
                >
                  ✨
                </div>
              ))}
            </div>
          );
        }

        return (
          <div 
            key={balloon.id} 
            className="absolute will-change-transform"
            style={{
              zIndex: balloon.zIndex,
              opacity: balloon.opacity,
              pointerEvents: 'auto', // Enable interaction
            }}
          >
            <div
              className={`${balloon.color} rounded-full shadow-lg backface-hidden cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-xl hover:brightness-110 active:scale-95`}
              style={{
                left: balloon.entryType === 'bottom' ? `${balloon.left}%` : `${balloon.left}px`,
                bottom: `${balloon.startBottom}px`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.3}px`,
                transform: `translateX(${balloon.swayDirection * balloon.swayIntensity}px) rotate(${balloon.rotationSpeed * 5}deg)`,
                // Use individual animation properties
                animationName: getAnimationName(),
                animationDuration: `${balloon.duration}s`,
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationDelay: `${balloon.animationDelay}s`,
                animationFillMode: 'both',
              }}
              onClick={(e) => handleBalloonClick(balloon.id, e)}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                target.style.filter = 'brightness(1.2) saturate(1.3)';
                target.style.transform = `translateX(${balloon.swayDirection * balloon.swayIntensity}px) rotate(${balloon.rotationSpeed * 5}deg) scale(1.15)`;
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLElement;
                target.style.filter = 'brightness(1) saturate(1)';
                target.style.transform = `translateX(${balloon.swayDirection * balloon.swayIntensity}px) rotate(${balloon.rotationSpeed * 5}deg) scale(1)`;
              }}
            >
              {/* Primary highlight */}
              <div
                className="absolute bg-white/50 rounded-full pointer-events-none"
                style={{
                  top: '8%',
                  left: '25%',
                  width: '35%',
                  height: '45%',
                }}
              />
              
              {/* Secondary highlight for depth */}
              <div
                className="absolute bg-white/30 rounded-full pointer-events-none"
                style={{
                  top: '15%',
                  left: '35%',
                  width: '20%',
                  height: '25%',
                }}
              />
              
              {/* Small sparkle highlight */}
              <div
                className="absolute bg-white/80 rounded-full animate-sparkle pointer-events-none"
                style={{
                  top: '10%',
                  left: '30%',
                  width: '8%',
                  height: '10%',
                }}
              />
              
              {/* Balloon string with varied length */}
              <div
                className="absolute bg-gray-400 pointer-events-none"
                style={{
                  bottom: `-${40 + Math.random() * 30}px`,
                  left: '50%',
                  width: '2px',
                  height: `${40 + Math.random() * 30}px`,
                  transform: 'translateX(-50%)',
                  // Use individual animation properties for string sway
                  animationName: 'sway',
                  animationDuration: `${2.5 + Math.random() * 3}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${balloon.animationDelay + 0.5}s`,
                }}
              />
              
              {/* String knot */}
              <div
                className="absolute bg-gray-600 rounded-full pointer-events-none"
                style={{
                  bottom: `-${45 + Math.random() * 30}px`,
                  left: '50%',
                  width: '4px',
                  height: '4px',
                  transform: 'translateX(-50%)',
                }}
              />
              
              {/* Small trailing ribbon */}
              <div
                className="absolute bg-gray-300 pointer-events-none"
                style={{
                  bottom: `-${55 + Math.random() * 30}px`,
                  left: '50%',
                  width: '1px',
                  height: `${8 + Math.random() * 12}px`,
                  transform: 'translateX(-50%)',
                  // Use individual animation properties for ribbon sway
                  animationName: 'sway',
                  animationDuration: `${1.5 + Math.random() * 2}s`,
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${balloon.animationDelay + 1}s`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}