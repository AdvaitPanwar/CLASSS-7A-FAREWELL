
import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type Category = 
  | 'General' 
  | 'Cricket' 
  | 'Football' 
  | 'Basketball' 
  | 'Kabaddi' 
  | 'Own Games' 
  | 'Friendship';

interface Memory {
  id: string;
  name: string;
  content: string;
  category: Category;
  timestamp: number;
  color: string;
}

type ViewState = 'landing' | 'farewell' | 'sports' | 'friendships' | 'summary' | 'form';

// --- Gemini Service ---
const generateHeartfeltRemark = async (keywords: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a warm, emotional, and creative farewell remark for a class 7 student based on these keywords: "${keywords}". Keep it under 40 words and make it sound personal and friendly.`,
    });
    return response.text?.trim() || "Thank you for the wonderful memories, Class 7A!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Wishing you all the best for the future!";
  }
};

const summarizeClassMemories = async (memories: Memory[]): Promise<string> => {
  if (memories.length === 0) return "Our story is just beginning...";
  const memoryText = memories.map(m => `${m.name} (${m.category}): ${m.content}`).join('\n');
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I have a list of memories from Class 7A students across different categories like sports and friendships. Please write a beautiful, collective farewell letter (approx 150 words) that captures the essence of these moments to send to their teacher. 
      Memories:
      ${memoryText}`,
    });
    return response.text?.trim() || "A collective thank you to everyone in Class 7A.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Thank you everyone for the beautiful journey together.";
  }
};

// --- Components ---

const Hero: React.FC<{ onEnter: () => void }> = ({ onEnter }) => (
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
        From the first day we walked through those doors to the final bells ringing today, it's been an incredible journey. Class 7A isn't just a section; it's a family.
      </p>
      <button 
        onClick={onEnter}
        className="mt-8 px-10 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(79,70,229,0.5)] hover:bg-indigo-700 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95"
      >
        Enter the Memory Wall
      </button>
    </div>
  </div>
);

const FarewellBoard: React.FC<{ memories: Memory[], onAdd: () => void }> = ({ memories, onAdd }) => (
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
          <div key={m.id} className={`${m.color} p-8 rounded-3xl shadow-lg border border-white/50 relative transform hover:scale-[1.02] transition-all`}>
            <span className="absolute top-4 right-6 text-2xl opacity-10">❝</span>
            <p className="text-gray-800 font-semibold leading-relaxed mb-6">{m.content}</p>
            <div className="border-t border-black/5 pt-4 flex justify-between items-center">
              <span className="font-handwritten text-xl text-gray-600">{m.name}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">7A Student</span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

const SportsBoard: React.FC<{ memories: Memory[], onAdd: (cat: Category) => void }> = ({ memories, onAdd }) => {
  const SPORTS: Category[] = ['Football', 'Basketball', 'Cricket', 'Kabaddi', 'Own Games'];
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-4xl font-extrabold text-gray-900">7A Sports Arena</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {SPORTS.map(sport => {
          const sportMemories = memories.filter(m => m.category === sport);
          return (
            <div key={sport} className="flex flex-col space-y-3">
              <div className="bg-white border-2 border-indigo-500/10 p-4 rounded-2xl shadow-sm flex justify-between items-center group">
                <h3 className="font-black text-xs uppercase tracking-widest text-indigo-600">{sport}</h3>
                <button onClick={() => onAdd(sport)} className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center transition hover:rotate-90">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
              <div className="space-y-3 min-h-[100px] p-2 rounded-2xl bg-indigo-50/30">
                {sportMemories.map(m => (
                  <div key={m.id} className={`${m.color} p-4 rounded-xl border border-white shadow-sm transition-all hover:-translate-y-1`}>
                    <p className="font-handwritten text-lg font-bold text-gray-800">"{m.content}"</p>
                    <p className="text-[9px] font-black text-indigo-400 mt-2 text-right">— {m.name}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FriendshipBoard: React.FC<{ memories: Memory[], onAdd: () => void }> = ({ memories, onAdd }) => (
  <div className="space-y-10 animate-in zoom-in-95 duration-500">
    <div className="text-center space-y-4">
      <div className="inline-block p-4 bg-pink-100 rounded-full text-3xl">🤝</div>
      <h2 className="text-4xl font-extrabold text-gray-900">Friendship Zone</h2>
      <button onClick={onAdd} className="mt-4 px-10 py-4 bg-pink-500 text-white rounded-full font-bold shadow-xl hover:bg-pink-600 transition">
        Write to Your Friends
      </button>
    </div>
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
      {memories.map(m => (
        <div key={m.id} className="break-inside-avoid bg-white p-8 rounded-2xl shadow-md border-l-8 border-pink-400 relative">
          <p className="font-cursive text-2xl text-pink-600 mb-4">Dearest Friends,</p>
          <p className="text-gray-700 leading-relaxed italic">{m.content}</p>
          <p className="mt-6 text-right font-handwritten text-xl text-gray-500">With love, {m.name}</p>
        </div>
      ))}
    </div>
  </div>
);

const MemoryForm: React.FC<{ category: Category, onSubmit: (m: { name: string, content: string, category: Category }) => void, onCancel: () => void }> = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleAiHelp = async () => {
    if (!formData.content) {
      setError('Write a few keywords first so I can help!');
      return;
    }
    setIsGenerating(true);
    const enhanced = await generateHeartfeltRemark(formData.content);
    setFormData(prev => ({ ...prev, content: enhanced }));
    setIsGenerating(false);
    setError('');
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-in zoom-in-95 duration-500 px-4">
      <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl relative border border-white/40">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Add to {category}</h2>
        <form onSubmit={(e) => { e.preventDefault(); if(formData.name && formData.content) onSubmit({...formData, category}); else setError('Both fields are required!'); }} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., Advait Panwar" className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-100 focus:ring-4 focus:ring-indigo-100 outline-none" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center"><label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label><button type="button" onClick={handleAiHelp} disabled={isGenerating} className="text-[10px] font-bold text-indigo-600">{isGenerating ? 'Polishing...' : '✨ Enhance with AI'}</button></div>
            <textarea rows={5} value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} placeholder="Tell your story..." className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-100 focus:ring-4 focus:ring-indigo-100 outline-none resize-none" />
          </div>
          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}
          <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="flex-1 py-4 font-bold text-gray-400">Cancel</button>
            <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition">Add Memory</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SummaryView: React.FC<{ memories: Memory[], onBack: () => void }> = ({ memories, onBack }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    summarizeClassMemories(memories).then(res => { setSummary(res); setIsLoading(false); });
  }, [memories]);

  const handleSendEmail = () => {
    const emailTo = "advaitpanwar5066@gmail.com";
    const subject = "Class 7A Collective Farewell Collection";
    let body = `Hi Advait,\n\nHere is our journey reflection:\n\n${summary}\n\n`;
    memories.forEach(m => body += `- [${m.category}] ${m.name}: "${m.content}"\n`);
    window.location.href = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="glass p-10 rounded-3xl shadow-xl text-center space-y-8">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">The Complete 7A Collection</h2>
        <div className="bg-white/60 p-8 rounded-2xl text-left italic text-gray-700 border border-indigo-100 font-cursive text-xl shadow-inner min-h-[200px]">
          {isLoading ? <p className="text-center animate-pulse">Our AI is summarizing our journey...</p> : <p className="whitespace-pre-wrap">{summary}</p>}
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={onBack} className="px-8 py-3 text-gray-400 font-bold">Review More</button>
          <button onClick={handleSendEmail} className="px-12 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-2xl hover:bg-indigo-700 transition flex items-center justify-center gap-3">
            Send to Advait
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [memories, setMemories] = useState<Memory[]>([]);
  const [formCategory, setFormCategory] = useState<Category>('General');

  const addMemory = (memory: Omit<Memory, 'id' | 'timestamp' | 'color'>) => {
    const colors = ['bg-yellow-50', 'bg-blue-50', 'bg-green-50', 'bg-pink-50', 'bg-purple-50', 'bg-orange-50'];
    const newMemory: Memory = {
      ...memory,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setMemories(prev => [newMemory, ...prev]);
    if (newMemory.category === 'Friendship') setView('friendships');
    else if (newMemory.category === 'General') setView('farewell');
    else setView('sports');
  };

  const openForm = (cat: Category) => { setFormCategory(cat); setView('form'); };

  return (
    <div className="relative min-h-screen pb-32">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl"></div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {view === 'landing' && <Hero onEnter={() => setView('farewell')} />}
        {view === 'farewell' && <FarewellBoard memories={memories.filter(m => m.category === 'General')} onAdd={() => openForm('General')} />}
        {view === 'sports' && <SportsBoard memories={memories} onAdd={openForm} />}
        {view === 'friendships' && <FriendshipBoard memories={memories.filter(m => m.category === 'Friendship')} onAdd={() => openForm('Friendship')} />}
        {view === 'form' && <MemoryForm category={formCategory} onCancel={() => setView('farewell')} onSubmit={addMemory} />}
        {view === 'summary' && <SummaryView memories={memories} onBack={() => setView('farewell')} />}
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-2xl flex items-center gap-2 md:gap-6 shadow-2xl z-50 border border-white/40">
        <button onClick={() => setView('landing')} className={`p-3 rounded-xl transition-all ${view === 'landing' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </button>
        <div className="w-[1px] h-8 bg-gray-200 mx-1"></div>
        <button onClick={() => setView('farewell')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'farewell' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}>Wall</button>
        <button onClick={() => setView('sports')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'sports' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}>Sports</button>
        <button onClick={() => setView('friendships')} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${view === 'friendships' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500'}`}>Friends</button>
        <div className="w-[1px] h-8 bg-gray-200 mx-1"></div>
        <button onClick={() => setView('summary')} className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-xl hover:bg-indigo-700 transition active:scale-95">Send All</button>
      </nav>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
