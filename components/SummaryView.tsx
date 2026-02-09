
import React, { useState, useEffect } from 'react';
import { Memory, Category } from '../types';
import { geminiService } from '../services/geminiService';

interface SummaryViewProps {
  memories: Memory[];
  onBack: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ memories, onBack }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setIsLoading(true);
      const res = await geminiService.summarizeClassMemories(memories);
      setSummary(res);
      setIsLoading(false);
    };
    fetchSummary();
  }, [memories]);

  const handleSendEmail = () => {
    const emailTo = "advaitpanwar5066@gmail.com";
    const subject = "Class 7A Collective Farewell Collection";
    
    const categories: Category[] = ['General', 'Friendship', 'Football', 'Basketball', 'Cricket', 'Kabaddi', 'Own Games'];
    
    let fullReport = `Hi Advait,\n\nHere is the collective memory collection from Class 7A.\n\nAI REFLECTION:\n${summary}\n\n`;

    categories.forEach(cat => {
      const catMems = memories.filter(m => m.category === cat);
      if (catMems.length > 0) {
        fullReport += `\n### ${cat.toUpperCase()} ###\n`;
        catMems.forEach(m => {
          fullReport += `- ${m.name}: "${m.content}"\n`;
        });
      }
    });

    fullReport += `\n\nGenerated with love by the Class of 7A Greeting Card App.`;
    
    const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullReport)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="glass p-10 rounded-3xl shadow-xl text-center space-y-8">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">The Complete 7A Collection</h2>
        <p className="text-gray-500">Ready to send all our memories and sports highlights to Advait.</p>

        <div className="bg-white/60 p-8 rounded-2xl text-left italic text-gray-700 border border-indigo-100 font-cursive text-xl shadow-inner">
          {isLoading ? <p className="text-center animate-pulse">Our AI is summarizing our journey...</p> : <p className="whitespace-pre-wrap">{summary}</p>}
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={onBack} className="px-8 py-3 text-gray-400 font-bold">Review More</button>
          <button onClick={handleSendEmail} className="px-12 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-2xl hover:bg-indigo-700 transition flex items-center justify-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            Send Collection to Advait
          </button>
        </div>
      </div>
    </div>
  );
};
