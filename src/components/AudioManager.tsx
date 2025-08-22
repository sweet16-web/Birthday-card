import { useEffect, useRef } from 'react';

interface AudioManagerProps {
  stage: string;
}

export function AudioManager({ stage }: AudioManagerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio context for sound effects
    const playSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine') => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.log('Audio not supported');
      }
    };

    const playMelody = (notes: number[], noteDuration: number = 0.7) => {
      notes.forEach((note, index) => {
        setTimeout(() => {
          playSound(note, noteDuration);
        }, index * noteDuration * 1000);
      });
    };

    // Play appropriate sounds for each stage
    switch (stage) {
      case 'balloons':
        // Gentle welcome chimes
        setTimeout(() => playMelody([523, 659, 784, 1047]), 500);
        break;
      
      case 'cake':
        // Happy birthday melody snippet
        setTimeout(() => playMelody([392, 392, 440, 392, 523, 494]), 500);
        break;
      
      case 'cake-cutting':
        // Celebratory sound
        setTimeout(() => playSound(800, 1), 100);
        setTimeout(() => playSound(1000, 1), 300);
        setTimeout(() => playSound(1200, 1), 500);
        break;
      
      case 'envelope':
        // Soft notification sound
        setTimeout(() => playSound(600, 0.4, 'triangle'), 200);
        break;
      
      case 'message':
        // Magical reveal sound
        setTimeout(() => playMelody([523, 659, 784, 1047, 1319]), 200);
        break;
      
      case 'interactive':
        // Playful game sound
        setTimeout(() => playSound(440, 0.2), 100);
        setTimeout(() => playSound(554, 0.2), 200);
        break;
      
      case 'gallery':
        // Photo gallery sound
        setTimeout(() => playSound(330, 0.3, 'triangle'), 150);
        break;
      
      case 'complete':
        // Grand finale
        setTimeout(() => playMelody([523, 659, 784, 1047, 1319, 1568], 0.4), 300);
        break;
    }
  }, [stage]);

  return (
    <div className="hidden">
      {/* Hidden audio element for potential future use */}
      <audio ref={audioRef} preload="none" />
    </div>
  );
}