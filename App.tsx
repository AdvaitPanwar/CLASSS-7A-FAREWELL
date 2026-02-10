
import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { MemoryForm } from './components/MemoryForm';
import { FarewellBoard } from './components/FarewellBoard';
import { SportsBoard } from './components/SportsBoard';
import { FriendshipBoard } from './components/FriendshipBoard';
import { SummaryView } from './components/SummaryView';
import { Memory, ViewState, Category } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [formCategory, setFormCategory] = useState<Category>('General');

  const addMemory = (memory: Omit<Memory, 'id' | 'timestamp' | 'color'>) => {
    const colors = [
      'bg-yellow-50', 'bg-blue-50', 'bg-green-50', 
      'bg-pink-50', 'bg-purple-50', 'bg-orange-50',
      'bg-emerald-50', 'bg-sky-50'
    ];
    const newMemory: Memory = {
      ...memory,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setMemories(prev => [newMemory, ...prev]);
    
    // Auto-navigate to the view where the memory was added
    if (newMemory.category === 'Friendship') setView('friendships');
    else if (newMemory.category === 'General') setView('farewell');
    else setView('sports');
  };

  const openForm = (cat: Category) => {
    setFormCategory(cat);
    setView('form');
  };

  return (
    <div className="relative min-h-screen pb-32 transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {view === 'landing' && <Hero onEnter={() => setView('farewell')} />}
        
        {view === 'farewell' && (
          <FarewellBoard 
            memories={memories.filter(m => m.category === 'General')} 
            onAdd={() => openForm('General')}
          />
        )}

        {view === 'sports' && (
          <SportsBoard 
            memories={memories} 
            onAdd={openForm}
          />
        )}

        {view === 'friendships' && (
          <FriendshipBoard 
            memories={memories.filter(m => m.category === 'Friendship')} 
            onAdd={() => openForm('Friendship')}
          />
        )}

        {view === 'form' && (
          <MemoryForm 
            category={formCategory}
            onCancel={() => {
              if (formCategory === 'Friendship') setView('friendships');
              else if (formCategory === 'General') setView('farewell');
              else setView('sports');
            }} 
            onSubmit={addMemory} 
          />
        )}

        {view === 'summary' && (
          <SummaryView 
            memories={memories} 
            onBack={() => setView('farewell')} 
          />
        )}
      </main>

      {/* Modern Fixed Navigation Bar */}
      {view !== 'landing' && (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-2xl flex items-center gap-2 md:gap-4 shadow-2xl z-50 border border-white/40">
          <button 
            onClick={() => setView('landing')} 
            className={`p-3 rounded-xl transition-all ${view === 'landing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
          
          <div className="w-[1px] h-8 bg-slate-200 mx-1"></div>
          
          <button 
            onClick={() => setView('farewell')} 
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${view === 'farewell' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Wall
          </button>
          
          <button 
            onClick={() => setView('sports')} 
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${view === 'sports' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Sports
          </button>
          
          <button 
            onClick={() => setView('friendships')} 
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${view === 'friendships' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600'}`}
          >
            Friends
          </button>

          <div className="w-[1px] h-8 bg-slate-200 mx-1"></div>

          <button 
            onClick={() => setView('summary')} 
            className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${view === 'summary' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-95'}`}
          >
            Send All
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
