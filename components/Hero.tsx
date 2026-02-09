
import React from 'react';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in duration-1000">
      <div className="relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl floating opacity-30">🎓</div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 pb-2">
          CLASS 7A FAREWELL
        </h1>
        <p className="font-cursive text-3xl md:text-4xl text-gray-700 mt-4">
          Celebrating a Year of Memories, Laughter & Friendship
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 px-4">
        <p className="text-lg text-gray-600 leading-relaxed">
          From the first day we walked through those doors to the final bells ringing today, 
          it's been an incredible journey. Class 7A isn't just a section; it's a family. 
          Thank you for making every lesson special and every break-time unforgettable.
        </p>
        
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="glass p-4 rounded-2xl shadow-sm">
            <div className="text-2xl mb-1">📸</div>
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400">Memories</div>
          </div>
          <div className="glass p-4 rounded-2xl shadow-sm scale-110 border-indigo-200">
            <div className="text-2xl mb-1">❤️</div>
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400">Friendships</div>
          </div>
          <div className="glass p-4 rounded-2xl shadow-sm">
            <div className="text-2xl mb-1">🚀</div>
            <div className="text-xs uppercase tracking-widest font-bold text-gray-400">Future</div>
          </div>
        </div>

        <button 
          onClick={onEnter}
          className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95"
        >
          Enter the Memory Wall
        </button>
      </div>
    </div>
  );
};
