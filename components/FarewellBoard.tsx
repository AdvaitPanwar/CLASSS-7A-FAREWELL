
import React from 'react';
import { Memory } from '../types';

interface FarewellBoardProps {
  memories: Memory[];
  onAdd: () => void;
}

export const FarewellBoard: React.FC<FarewellBoardProps> = ({ memories, onAdd }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900">The Farewell Wall</h2>
          <p className="text-gray-500 mt-2">General remarks and final messages for Class 7A.</p>
        </div>
        <button 
          onClick={onAdd}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-700 transition active:scale-95"
        >
          Post Farewell Remark
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {memories.length === 0 ? (
          <div className="col-span-full py-20 text-center opacity-30">
            <span className="text-6xl mb-4 block">📮</span>
            <p className="font-bold">Waiting for the first farewell note...</p>
          </div>
        ) : (
          memories.map(m => (
            <div key={m.id} className={`${m.color} p-8 rounded-3xl shadow-lg border border-white/50 relative transform rotate-${Math.random() > 0.5 ? '1' : '-1'}`}>
              <span className="absolute top-4 right-6 text-2xl opacity-10">❝</span>
              <p className="text-gray-800 font-semibold leading-relaxed mb-6">
                {m.content}
              </p>
              <div className="border-t border-black/5 pt-4 flex justify-between items-center">
                <span className="font-handwritten text-xl text-gray-600">{m.name}</span>
                <span className="text-[10px] text-gray-400 font-bold">7A STUDENT</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
