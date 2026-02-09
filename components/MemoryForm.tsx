
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Category } from '../types';

interface MemoryFormProps {
  category: Category;
  onSubmit: (memory: { name: string, content: string, category: Category }) => void;
  onCancel: () => void;
}

export const MemoryForm: React.FC<MemoryFormProps> = ({ category, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', content: '' });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const getPlaceholder = () => {
    if (category === 'Friendship') return "Write a special message for your best friends...";
    if (category === 'General') return "Write your farewell remarks for the whole class...";
    return `Tell us about your favorite ${category} moment!`;
  };

  const handleAiHelp = async () => {
    if (!formData.content) {
      setError('Write a few keywords first so I can help!');
      return;
    }
    setIsGenerating(true);
    setError('');
    const enhanced = await geminiService.generateHeartfeltRemark(formData.content);
    setFormData(prev => ({ ...prev, content: enhanced }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) {
      setError('Both name and message are required.');
      return;
    }
    onSubmit({ ...formData, category });
  };

  return (
    <div className="max-w-xl mx-auto py-10 animate-in zoom-in-95 duration-500 px-4">
      <div className="glass p-8 md:p-10 rounded-3xl shadow-2xl relative border border-white/40">
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {category === 'General' ? 'Class Farewell' : category === 'Friendship' ? 'Friendship Note' : `${category} Highlight`}
        </h2>
        <p className="text-gray-500 mb-8 text-sm">Add your mark to Class 7A's history.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Advait Panwar"
              className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition outline-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
              <button 
                type="button"
                onClick={handleAiHelp}
                disabled={isGenerating}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                {isGenerating ? 'Polishing...' : '✨ Enhance with AI'}
              </button>
            </div>
            <textarea 
              rows={5}
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              placeholder={getPlaceholder()}
              className="w-full px-5 py-4 rounded-2xl bg-white/80 border border-gray-100 focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition outline-none resize-none"
            />
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <div className="flex gap-4">
            <button type="button" onClick={onCancel} className="flex-1 py-4 font-bold text-gray-400">Cancel</button>
            <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg hover:bg-indigo-700 transition">
              Add Memory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
