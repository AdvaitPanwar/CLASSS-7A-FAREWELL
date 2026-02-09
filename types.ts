
export type Category = 
  | 'General' 
  | 'Cricket' 
  | 'Football' 
  | 'Basketball' 
  | 'Kabaddi' 
  | 'Own Games' 
  | 'Friendship';

export interface Memory {
  id: string;
  name: string;
  content: string;
  category: Category;
  timestamp: number;
  color: string;
}

export type ViewState = 'landing' | 'farewell' | 'sports' | 'friendships' | 'summary' | 'form';
