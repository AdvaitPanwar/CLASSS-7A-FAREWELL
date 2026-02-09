
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
      <div className="text-center md:text-left px-2 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">7A Sports Arena</h2>
          <p className="text-gray-500 mt-2">Every goal, every run, and every match we played together.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {SPORTS.map(sport => {
          const sportMemories = memories.filter(m => m.category === sport);
          return (
            <div key={sport} className="flex flex-col space-y-3 h-full">
              <div className="bg-white border-2 border-indigo-500/10 p-4 rounded-2xl shadow-sm flex justify-between items-center group hover:border-indigo-500/30 transition-colors">
                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600">{sport}</h3>
                <button 
                  onClick={() => onAdd(sport)}
                  className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center transition transform active:scale-90 hover:rotate-90"
                  title={`Add ${sport} memory`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>

              <div className="flex-1 space-y-3 min-h-[100px] p-2 rounded-2xl bg-indigo-50/30 border border-transparent hover:border-indigo-100 transition-colors">
                {sportMemories.length === 0 ? (
                  <div className="h-full flex items-center justify-center py-10 opacity-20 italic text-[10px] text-center px-4 font-bold text-indigo-400 uppercase tracking-widest">
                    No {sport} stories yet
                  </div>
                ) : (
                  sportMemories.map(m => (
                    <div key={m.id} className={`${m.color} p-4 rounded-xl border border-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1`}>
                      <p className="font-handwritten text-lg font-bold text-gray-800 leading-tight">"{m.content}"</p>
                      <p className="text-[9px] font-black text-indigo-400 mt-2 text-right tracking-tighter">— {m.name}</p>
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
