
import React from 'react';
import { Memory } from '../types';

interface MemoryBoardProps {
  memories: Memory[];
  onAddRequest: () => void;
  onSendRequest: () => void;
}

export const MemoryBoard: React.FC<MemoryBoardProps> = ({ memories, onAddRequest, onSendRequest }) => {
  return (
    <div className="space-y-10 py-8 animate-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">Class 7A Memory Wall</h2>
          <p className="text-gray-500 mt-1">Our journey, recorded forever.</p>
        </div>
        <div className="flex gap-4">
          {memories.length > 0 && (
            <button 
              onClick={onSendRequest}
              className="flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              Send Collective Card
            </button>
          )}
        </div>
      </div>

      {memories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/40 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-6xl mb-6">🏜️</div>
          <h3 className="text-xl font-bold text-gray-700">The wall is empty!</h3>
          <p className="text-gray-500 mb-8 text-center max-w-xs">Be the first to share a memory from Class 7A and start the collection.</p>
          <button 
            onClick={onAddRequest}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:bg-indigo-700 transition active:scale-95"
          >
            Start the Wall
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          {memories.map((memory) => (
            <div 
              key={memory.id} 
              className={`${memory.color} p-6 md:p-8 rounded-3xl shadow-xl transform rotate-${Math.random() > 0.5 ? '1' : '-1'} hover:rotate-0 hover:scale-[1.02] transition-all duration-300 border border-white/50 flex flex-col space-y-6`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-handwritten text-2xl font-bold text-gray-800 border-b-2 border-indigo-200 pb-1">
                  {memory.name}
                </h3>
                <span className="text-[10px] uppercase font-bold text-gray-400 bg-white/80 px-2 py-1 rounded-full shadow-sm">
                  {new Date(memory.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              {/* Columns Layout for Sport & Friendship */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 p-3 rounded-2xl border border-white/80 shadow-sm flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-1">Sport</span>
                  <span className="text-lg">🏅</span>
                  <p className="text-indigo-800 font-bold text-sm leading-tight mt-1">{memory.favoriteSport}</p>
                </div>
                <div className="bg-white/60 p-3 rounded-2xl border border-white/80 shadow-sm flex flex-col items-center text-center">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-tighter mb-1">Friends</span>
                  <span className="text-lg">🤝</span>
                  <p className="text-pink-600 font-bold text-sm leading-tight mt-1 truncate w-full px-1" title={memory.friends}>
                    {memory.friends}
                  </p>
                </div>
              </div>

              <div className="space-y-4 bg-white/40 p-5 rounded-2xl border border-white/60 shadow-inner">
                <div>
                  <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">Golden Memory</label>
                  <p className="text-gray-700 italic leading-snug font-medium">"{memory.favoriteMoment}"</p>
                </div>
                
                <div className="border-t border-white/80 pt-3">
                  <label className="text-[10px] font-black text-pink-400 uppercase tracking-widest block mb-1">Farewell Note</label>
                  <p className="text-gray-800 leading-relaxed text-sm font-semibold">{memory.remarks}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center opacity-40 hover:opacity-100 transition pt-2">
                <span className="text-xl">7A</span>
                <span className="font-cursive text-lg text-indigo-800">Together Forever</span>
              </div>
            </div>
          ))}

          <button 
            onClick={onAddRequest}
            className="group border-4 border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-gray-400 hover:border-indigo-300 hover:text-indigo-400 transition min-h-[400px]"
          >
            <div className="w-16 h-16 rounded-full border-4 border-current flex items-center justify-center mb-4 group-hover:scale-110 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <span className="font-bold text-lg">Add Your Story</span>
            <p className="text-sm mt-2 text-center max-w-[150px]">Don't leave the wall without your mark!</p>
          </button>
        </div>
      )}
    </div>
  );
};
