import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Heart, Download } from 'lucide-react';

interface PhotoGalleryProps {
  onComplete: () => void;
}

interface Photo {
  id: number;
  url: string;
  caption: string;
  memory: string;
  location?: string;
  date?: string;
  isFavorite?: boolean;
}

export function PhotoGallery({ onComplete }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [favorites, setFavorites] = useState<number[]>([]);

  // Real photo placeholders with more personal memories for Eda
  const photos: Photo[] = [
    {
      id: 1,
      url: 'image/edasaner.jpg',
      caption: '🎂 Eda\'s Amazing Birthday Celebration',
      memory: 'Remember this incredible celebration, Eda? The way you lit up when everyone sang happy birthday - your smile was absolutely radiant! 💫',
      location: 'Your Favorite Restaurant',
      date: 'Last Year',
      isFavorite: true
    },
    {
      id: 2,
      url: 'image/edawish.jpg',
      caption: '🌟 Making Wishes with Eda',
      memory: 'That magical moment when you closed your eyes and made your special wish. We all knew it would come true because you deserve all the happiness in the world! ✨',
      location: 'Garden Party',
      date: 'Summer',
      isFavorite: true
    },
    {
      id: 3,
      url: 'image/edajoy.jpg',
      caption: '🎈 Eda\'s Joyful Laughter',
      memory: 'Your infectious laughter that day filled everyone\'s hearts with joy. Eda, you have this amazing ability to make every moment brighter! 💖',
      location: 'Park Picnic',
      date: 'Spring',
      isFavorite: false
    },
    {
      id: 4,
      url: 'image/edafamily.jpg',
      caption: '🎉 Eda Surrounded by Love',
      memory: 'Look at all the love surrounding you, Eda! Every person in this photo adores you, and it shows. You bring out the best in everyone around you! 🥰',
      location: 'Family Gathering',
      date: 'Winter',
      isFavorite: true
    },
    {
      id: 5,
      url: 'image/edaspirit.jpg',
      caption: '✨ Eda\'s Sparkling Personality',
      memory: 'This photo captures your beautiful spirit perfectly, Eda. The way you embrace life with such enthusiasm and grace inspires everyone who knows you! 🌈',
      location: 'Beach Day',
      date: 'Summer',
      isFavorite: false
    },
    {
      id: 6,
      url: 'image/edadreams.jpg',
      caption: '💫 Eda\'s Dreams Coming True',
      memory: 'Every birthday marks another year of your dreams becoming reality, Eda. Keep dreaming big because the world needs more people like you! 🌟',
      location: 'Rooftop Celebration',
      date: 'Evening',
      isFavorite: true
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [photos.length, isAutoPlay]);

  const nextPhoto = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleFavorite = (photoId: number) => {
    setFavorites(prev => 
      prev.includes(photoId) 
        ? prev.filter(id => id !== photoId)
        : [...prev, photoId]
    );
  };

  const handleClose = () => {
    onComplete();
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="relative max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl mb-2">📸 Eda's Memory Lane</h2>
              <p className="text-purple-100">Beautiful moments with our amazing Eda ✨</p>
            </div>
            <button
              onClick={handleClose}
              className="p-3 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Photo Display */}
        <div className="relative aspect-video bg-gradient-to-br from-purple-50 to-pink-50">
          <ImageWithFallback
            src={currentPhoto.url}
            alt={currentPhoto.caption}
            className="w-full h-full object-cover"
          />
          
          {/* Photo Overlay Info */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              {currentPhoto.location && (
                <span className="text-sm">📍 {currentPhoto.location}</span>
              )}
              {currentPhoto.date && (
                <span className="text-sm">📅 {currentPhoto.date}</span>
              )}
            </div>
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => toggleFavorite(currentPhoto.id)}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-3 rounded-full transition-all hover:scale-110"
          >
            <Heart 
              size={24} 
              className={`${
                favorites.includes(currentPhoto.id) || currentPhoto.isFavorite
                  ? 'text-red-400 fill-current' 
                  : 'text-white'
              }`} 
            />
          </button>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all hover:scale-110"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            onClick={nextPhoto}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full transition-all hover:scale-110"
          >
            <ChevronRight size={28} />
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full">
            <span className="text-sm font-medium">{currentIndex + 1} / {photos.length}</span>
          </div>
        </div>

        {/* Photo Info */}
        <div className="p-8 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50">
          <h3 className="text-2xl text-purple-800 mb-3">
            {currentPhoto.caption}
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed text-lg">
            {currentPhoto.memory}
          </p>

          {/* Thumbnail Navigation */}
          <div className="flex space-x-3 justify-center overflow-x-auto pb-4 mb-6">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlay(false);
                }}
                className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-3 transition-all hover:scale-105 ${
                  index === currentIndex
                    ? 'border-purple-500 shadow-lg scale-105'
                    : 'border-gray-300 hover:border-purple-300'
                }`}
              >
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                {(photo.isFavorite || favorites.includes(photo.id)) && (
                  <div className="absolute top-1 right-1">
                    <Heart size={12} className="text-red-400 fill-current" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={isAutoPlay}
                  onChange={(e) => setIsAutoPlay(e.target.checked)}
                  className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="autoplay" className="text-sm text-gray-600">
                  Auto-play slideshow
                </label>
              </div>
              
              <button
                onClick={() => window.open(currentPhoto.url, '_blank')}
                className="flex items-center space-x-2 text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>

            <div className="text-sm text-gray-500">
              💜 {favorites.length + photos.filter(p => p.isFavorite).length} favorites
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-8 py-6 text-center">
          <button
            onClick={handleClose}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-105"
          >
            Continue the Magic 🎉
          </button>
        </div>
      </div>
    </div>
  );
}