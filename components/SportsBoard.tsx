
import React from 'react';
import { Memory, Category } from '../types';

interface SportsBoardProps {
  memories: Memory[];
  onAdd: (cat: Category) => void;
}

const SPORTS: Category[] = ['Football', 'Basketball', 'Cricket', 'Kabaddi', 'Own Games'];

export const SportsBoard: React.FC<SportsBoardProps> = ({ memories, onAdd }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="text-center md:text-left px-2">
        <h2 className="text-4xl font-extrabold text-gray-900">Sports Highlights</h2>
        <p className="text-gray-500 mt-2">The games that defined Class 7A this year.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
        {SPORTS.map(sport => {
          const sportMemories = memories.filter(m => m.category === sport);
          return (
            <div key={sport} className="flex flex-col space-y-4">
              <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg flex justify-between items-center">
                <h3 className="font-bold text-sm uppercase tracking-widest">{sport}</h3>
                <button 
                  onClick={() => onAdd(sport)}
                  className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/40 flex items-center justify-center transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>

              <div className="space-y-4">
                {sportMemories.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl text-center">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">No moments yet</p>
                  </div>
                ) : (
                  sportMemories.map(m => (
                    <div key={m.id} className={`${m.color} p-4 rounded-xl border border-white shadow-sm transform transition-transform hover:scale-[1.02]`}>
                      <p className="font-handwritten text-lg font-bold text-gray-800 leading-tight">"{m.content}"</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-3 text-right">— {m.name}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
