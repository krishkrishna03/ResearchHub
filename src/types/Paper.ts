export interface Paper {
  _id: string;
  title: string;
  authors: string[];
  publicationDate: string;
  abstract: string;
  category: PaperCategory;
  summary: {
    problem: string;
    method: string;
    dataset: string;
    keyResults: string;
    takeaway: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type PaperCategory = 'CV' | 'NLP' | 'RL' | 'ML' | 'AI' | 'Other';

export const PAPER_CATEGORIES: PaperCategory[] = ['CV', 'NLP', 'RL', 'ML', 'AI', 'Other'];