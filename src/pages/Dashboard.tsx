import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { usePapers } from '../context/PaperContext';
import PaperCard from '../components/Papers/PaperCard';
import SearchAndFilter from '../components/Papers/SearchAndFilter';
import { FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { papers, loading, error, fetchPapers, clearError } = usePapers();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredPapers = useMemo(() => {
    if (searchTerm || selectedCategory) {
      return papers.filter(paper => {
        const matchesSearch = searchTerm === '' || 
          paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
          paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.summary.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.summary.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paper.summary.takeaway.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = selectedCategory === '' || paper.category === selectedCategory;

        return matchesSearch && matchesCategory;
      });
    }
    return papers;
  }, [papers, searchTerm, selectedCategory]);

  // Handle search with API call for better performance
  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    if (term.length > 2 || term === '') {
      await fetchPapers({ search: term, category: selectedCategory });
    }
  };

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    await fetchPapers({ search: searchTerm, category });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Research Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {papers.length} paper{papers.length !== 1 ? 's' : ''} in your collection
          </p>
        </div>
        <Link to="/add-paper">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Paper
          </Button>
        </Link>
      </motion.div>

      {/* Search and Filter */}
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading papers...</p>
        </div>
      )}

      {/* Error State */}
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

      {/* Results Info */}
      {(searchTerm || selectedCategory) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-600"
        >
          Showing {filteredPapers.length} of {papers.length} papers
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </motion.div>
      )}

      {/* Papers Grid */}
      {!loading && filteredPapers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper, index) => (
            <PaperCard key={paper._id} paper={paper} index={index} />
          ))}
        </div>
      ) : !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {papers.length === 0 ? 'No papers yet' : 'No papers found'}
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            {papers.length === 0 
              ? 'Start building your research library by adding your first paper.'
              : 'Try adjusting your search terms or filters to find what you\'re looking for.'
            }
          </p>
          {papers.length === 0 && (
            <Link to="/add-paper">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Paper
              </Button>
            </Link>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;