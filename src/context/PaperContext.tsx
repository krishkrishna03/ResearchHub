import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Paper } from '../types/Paper';
import { paperAPI } from '../services/api';

interface PaperContextType {
  papers: Paper[];
  loading: boolean;
  error: string | null;
  addPaper: (paper: Omit<Paper, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePaper: (id: string, paper: Partial<Paper>) => Promise<void>;
  deletePaper: (id: string) => Promise<void>;
  getPaper: (id: string) => Paper | undefined;
  fetchPapers: (params?: { search?: string; category?: string }) => Promise<void>;
  clearError: () => void;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export const usePapers = () => {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
};

interface PaperProviderProps {
  children: ReactNode;
}

export const PaperProvider: React.FC<PaperProviderProps> = ({ children }) => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchPapers = async (params?: { search?: string; category?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await paperAPI.getAllPapers(params);
      setPapers(response.papers || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch papers');
      console.error('Error fetching papers:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPaper = async (paperData: Omit<Paper, '_id' | 'createdAt' | 'updatedAt'>) => {
    setLoading(true);
    setError(null);
    try {
      const newPaper = await paperAPI.createPaper(paperData);
      setPapers(prev => [newPaper, ...prev]);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add paper');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePaper = async (id: string, updates: Partial<Paper>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPaper = await paperAPI.updatePaper(id, updates);
      setPapers(prev => prev.map(paper => 
        paper._id === id ? updatedPaper : paper
      ));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update paper');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePaper = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await paperAPI.deletePaper(id);
      setPapers(prev => prev.filter(paper => paper._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete paper');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getPaper = (id: string) => {
    return papers.find(paper => paper._id === id);
  };

  // Load papers on mount
  useEffect(() => {
    fetchPapers();
  }, []);

  return (
    <PaperContext.Provider value={{
      papers,
      loading,
      error,
      addPaper,
      updatePaper,
      deletePaper,
      getPaper,
      fetchPapers,
      clearError
    }}>
      {children}
    </PaperContext.Provider>
  );
};