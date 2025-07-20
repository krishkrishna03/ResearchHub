import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Plus, BarChart3, Search, Filter, FileText } from 'lucide-react';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const features = [
    {
      icon: Plus,
      title: 'Add Research Papers',
      description: 'Easily add new research papers with structured summaries including problem, method, dataset, and key findings.'
    },
    {
      icon: Search,
      title: 'Smart Search & Filter',
      description: 'Find papers quickly with powerful search functionality and category-based filtering across CV, NLP, RL, and more.'
    },
    {
      icon: BarChart3,
      title: 'Visual Dashboard',
      description: 'View all your papers in a beautiful card-based layout with smooth animations and hover effects.'
    },
    {
      icon: FileText,
      title: 'Detailed Views',
      description: 'Access comprehensive paper details with clean, academic formatting optimized for readability.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="bg-blue-100 p-4 rounded-full">
              <BookOpen className="w-16 h-16 text-blue-800" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Research Paper
            <span className="text-blue-800 block">Dashboard</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Organize, search, and manage your AI and Machine Learning research papers 
            with a beautiful, professional interface designed for researchers and academics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="w-full sm:w-auto">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Dashboard
            </Button>
          </Link>
          <Link to="/add-paper">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Paper
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-12"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Research Management
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built with modern web technologies and designed with researchers in mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-12 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Organize Your Research?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Start building your personal research library today. Add papers, create summaries, 
          and keep track of the latest developments in your field.
        </p>
        <Link to="/add-paper">
          <Button variant="secondary" size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Paper
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;