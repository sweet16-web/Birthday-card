import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  shape: 'circle' | 'square' | 'triangle' | 'heart' | 'star';
}

export function ConfettiExplosion() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'bg-purple-400', 'bg-pink-400', 'bg-violet-400', 'bg-fuchsia-400',
      'bg-rose-400', 'bg-indigo-400', 'bg-cyan-400', 'bg-emerald-400',
      'bg-yellow-400', 'bg-orange-400', 'bg-red-400', 'bg-blue-400'
    ];

    const shapes: ('circle' | 'square' | 'triangle' | 'heart' | 'star')[] = ['circle', 'square', 'triangle', 'heart', 'star'];

    const createConfetti = () => {
      const pieces: ConfettiPiece[] = [];
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      for (let i = 0; i < 150; i++) {
        pieces.push({
          id: i,
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 6 + Math.random() * 12,
          rotation: Math.random() * 360,
          velocityX: (Math.random() - 0.5) * 8,
          velocityY: -Math.random() * 15 - 5,
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }

      setConfetti(pieces);
    };

    createConfetti();

    // Clear confetti after animation
    const timeout = setTimeout(() => {
      setConfetti([]);
    }, 4000);

    return () => clearTimeout(timeout);
  }, []);

  const renderShape = (piece: ConfettiPiece) => {
    const baseStyle = {
      width: `${piece.size}px`,
      height: `${piece.size}px`,
      transform: `rotate(${piece.rotation}deg)`,
    };

    switch (piece.shape) {
      case 'circle':
        return <div className={`${piece.color} rounded-full`} style={baseStyle} />;
      case 'square':
        return <div className={piece.color} style={baseStyle} />;
      case 'triangle':
        return (
          <div
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid`,
            }}
            className={piece.color.replace('bg-', 'border-b-')}
          />
        );
      case 'heart':
        return (
          <div className="relative" style={baseStyle}>
            <div className="text-red-500" style={{ fontSize: `${piece.size}px` }}>💖</div>
          </div>
        );
      case 'star':
        return (
          <div className="relative" style={baseStyle}>
            <div className="text-yellow-400" style={{ fontSize: `${piece.size}px` }}>⭐</div>
          </div>
        );
      default:
        return <div className={`${piece.color} rounded-full`} style={baseStyle} />;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-[confettiFall_4s_ease-out_forwards]"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            '--confetti-x': `${piece.velocityX * 100}px`,
            '--confetti-y': `${piece.velocityY * 20}px`,
          } as any}
        >
          {renderShape(piece)}
        </div>
      ))}
      
      {/* Additional burst effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-8xl animate-ping opacity-75">🎉</div>
      </div>
      
      <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-6xl animate-bounce" style={{ animationDelay: '0.5s' }}>✨</div>
      </div>
      
      <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
        <div className="text-6xl animate-bounce" style={{ animationDelay: '1s' }}>🌟</div>
      </div>
      
      <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2">
        <div className="text-5xl animate-pulse" style={{ animationDelay: '1.5s' }}>💫</div>
      </div>
      
      <div className="absolute bottom-1/3 right-1/3 transform translate-x-1/2 translate-y-1/2">
        <div className="text-5xl animate-pulse" style={{ animationDelay: '2s' }}>🎊</div>
      </div>
    </div>
  );
}