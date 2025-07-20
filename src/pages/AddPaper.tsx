import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { PAPER_CATEGORIES, PaperCategory } from '../types/Paper';
import Button from '../components/UI/Button';
import { Save, ArrowLeft } from 'lucide-react';

const AddPaper: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { addPaper, updatePaper, getPaper, loading, error, clearError } = usePapers();
  
  const isEditing = Boolean(id);
  const existingPaper = id ? getPaper(id) : null;

  const [formData, setFormData] = useState({
    title: '',
    authors: '',
    publicationDate: '',
    abstract: '',
    category: 'AI' as PaperCategory,
    summary: {
      problem: '',
      method: '',
      dataset: '',
      keyResults: '',
      takeaway: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing paper data when editing
  useEffect(() => {
    if (isEditing && existingPaper) {
      setFormData({
        title: existingPaper.title,
        authors: existingPaper.authors.join(', '),
        publicationDate: existingPaper.publicationDate.split('T')[0], // Format for date input
        abstract: existingPaper.abstract,
        category: existingPaper.category,
        summary: existingPaper.summary
      });
    }
  }, [isEditing, existingPaper]);

  // Clear error when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('summary.')) {
      const summaryField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        summary: {
          ...prev.summary,
          [summaryField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const paperData = {
        ...formData,
        authors: formData.authors.split(',').map(author => author.trim()).filter(Boolean)
      };

      if (isEditing && id) {
        await updatePaper(id, paperData);
      } else {
        await addPaper(paperData);
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving paper:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? 'Edit Research Paper' : 'Add Research Paper'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isEditing ? 'Update the paper details' : 'Create a structured summary of your research paper'}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button
              onClick={clearError}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Basic Information
              </h2>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter the full title of the research paper"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="authors" className="block text-sm font-medium text-gray-700 mb-2">
                    Authors *
                  </label>
                  <input
                    type="text"
                    id="authors"
                    name="authors"
                    required
                    value={formData.authors}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Author 1, Author 2, Author 3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple authors with commas</p>
                </div>

                <div>
                  <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Publication Date *
                  </label>
                  <input
                    type="date"
                    id="publicationDate"
                    name="publicationDate"
                    required
                    value={formData.publicationDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {PAPER_CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="abstract" className="block text-sm font-medium text-gray-700 mb-2">
                  Abstract *
                </label>
                <textarea
                  id="abstract"
                  name="abstract"
                  required
                  rows={4}
                  value={formData.abstract}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Enter the paper's abstract..."
                />
              </div>
            </div>

            {/* Structured Summary */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Structured Summary
              </h2>

              <div>
                <label htmlFor="summary.problem" className="block text-sm font-medium text-gray-700 mb-2">
                  Problem Addressed *
                </label>
                <textarea
                  id="summary.problem"
                  name="summary.problem"
                  required
                  rows={3}
                  value={formData.summary.problem}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What core problem does this research address?"
                />
              </div>

              <div>
                <label htmlFor="summary.method" className="block text-sm font-medium text-gray-700 mb-2">
                  Method/Model Proposed *
                </label>
                <textarea
                  id="summary.method"
                  name="summary.method"
                  required
                  rows={3}
                  value={formData.summary.method}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What method, model, or approach is proposed?"
                />
              </div>

              <div>
                <label htmlFor="summary.dataset" className="block text-sm font-medium text-gray-700 mb-2">
                  Dataset/Experiments *
                </label>
                <textarea
                  id="summary.dataset"
                  name="summary.dataset"
                  required
                  rows={3}
                  value={formData.summary.dataset}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What datasets or experiments were used?"
                />
              </div>

              <div>
                <label htmlFor="summary.keyResults" className="block text-sm font-medium text-gray-700 mb-2">
                  Key Findings and Results *
                </label>
                <textarea
                  id="summary.keyResults"
                  name="summary.keyResults"
                  required
                  rows={3}
                  value={formData.summary.keyResults}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="What are the main findings and quantitative results?"
                />
              </div>

              <div>
                <label htmlFor="summary.takeaway" className="block text-sm font-medium text-gray-700 mb-2">
                  Key Takeaway *
                </label>
                <textarea
                  id="summary.takeaway"
                  name="summary.takeaway"
                  required
                  rows={2}
                  value={formData.summary.takeaway}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="One-line summary of the main contribution or insight"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isSubmitting || loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || loading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Saving...' : isEditing ? 'Update Paper' : 'Save Paper'}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddPaper;