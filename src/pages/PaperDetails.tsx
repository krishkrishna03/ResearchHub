import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePapers } from '../context/PaperContext';
import { ArrowLeft, Calendar, Users, Edit, Trash2, ExternalLink } from 'lucide-react';
import Button from '../components/UI/Button';

const PaperDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPaper } = usePapers();
  
  const paper = id ? getPaper(id) : undefined;

  if (!paper) {
    return (
      <div className="text-center py-16">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Paper Not Found</h1>
        <p className="text-gray-600 mb-6">The paper you're looking for doesn't exist.</p>
        <Link to="/dashboard">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      CV: 'bg-blue-100 text-blue-800',
      NLP: 'bg-green-100 text-green-800',
      RL: 'bg-purple-100 text-purple-800',
      ML: 'bg-orange-100 text-orange-800',
      AI: 'bg-red-100 text-red-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.Other;
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
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <div className="flex space-x-3">
            <Link to={`/edit-paper/${paper._id}`}>
              <React.Fragment>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </React.Fragment>
            </Link>
          </div>
        </div>

        {/* Paper Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(paper.category)}`}>
                {paper.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(paper.publicationDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {paper.title}
            </h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-lg">{paper.authors.join(', ')}</span>
            </div>
          </div>

          {/* Abstract Section */}
          <div className="p-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {paper.abstract}
            </p>
          </div>

          {/* Structured Summary Section */}
          <div className="p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Research Summary</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🎯 Problem Addressed</h3>
                <p className="text-red-700 leading-relaxed">{paper.summary.problem}</p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">🔬 Method/Model Proposed</h3>
                <p className="text-blue-700 leading-relaxed">{paper.summary.method}</p>
              </div>

              <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">📊 Dataset/Experiments</h3>
                <p className="text-purple-700 leading-relaxed">{paper.summary.dataset}</p>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">📈 Key Findings & Results</h3>
                <p className="text-orange-700 leading-relaxed">{paper.summary.keyResults}</p>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-green-800 mb-3">✅ Key Takeaway</h3>
                <p className="text-green-700 leading-relaxed font-medium italic">
                  {paper.summary.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          {paper.createdAt && (
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Added on {new Date(paper.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PaperDetails;