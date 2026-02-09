
import React from 'react';
import { Memory } from '../types';

interface FriendshipBoardProps {
  memories: Memory[];
  onAdd: () => void;
}

export const FriendshipBoard: React.FC<FriendshipBoardProps> = ({ memories, onAdd }) => {
  return (
    <div className="space-y-10 animate-in zoom-in-95 duration-500">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-pink-100 rounded-full text-3xl">🤝</div>
        <h2 className="text-4xl font-extrabold text-gray-900">Friendship Zone</h2>
        <p className="text-gray-500 max-w-lg mx-auto italic font-cursive text-xl">
          "Friends are the family we choose in Class 7A."
        </p>
        <button 
          onClick={onAdd}
          className="mt-4 px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl hover:bg-pink-600 transition"
        >
          Write to Your Friends
        </button>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {memories.map(m => (
          <div key={m.id} className="break-inside-avoid bg-white p-8 rounded-2xl shadow-md border-l-8 border-pink-400 relative">
            <p className="font-cursive text-2xl text-pink-600 mb-4">Dearest Friends,</p>
            <p className="text-gray-700 leading-relaxed italic">
              {m.content}
            </p>
            <p className="mt-6 text-right font-handwritten text-xl text-gray-500">
              With love, {m.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
