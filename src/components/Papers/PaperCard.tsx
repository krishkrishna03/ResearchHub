import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Paper } from '../../types/Paper';
import { usePapers } from '../../context/PaperContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../UI/Modal';
import Button from '../UI/Button';

interface PaperCardProps {
  paper: Paper;
  index: number;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, index }) => {
  const { deletePaper } = usePapers();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deletePaper(paper._id);
    setShowDeleteModal(false);
  };

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
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
        className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(paper.category)}`}>
                {paper.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(paper.publicationDate).toLocaleDateString()}
              </div>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {paper.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-3">
              <Users className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{paper.authors.join(', ')}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => navigate(`/paper/${paper._id}`)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="View Details"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate(`/edit-paper/${paper._id}`)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit Paper"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete Paper"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Problem:</span>
            <span className="text-gray-600 ml-2">{paper.summary.problem}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Method:</span>
            <span className="text-gray-600 ml-2">{paper.summary.method}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Dataset:</span>
            <span className="text-gray-600 ml-2">{paper.summary.dataset}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Key Results:</span>
            <span className="text-gray-600 ml-2">{paper.summary.keyResults}</span>
          </div>
          <div className="pt-2 border-t border-gray-100">
            <span className="font-semibold text-green-700">✅ Takeaway:</span>
            <span className="text-gray-700 ml-2 italic">{paper.summary.takeaway}</span>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Paper"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{paper.title}"? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PaperCard;