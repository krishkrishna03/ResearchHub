import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PaperProvider } from './context/PaperContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddPaper from './pages/AddPaper';
import PaperDetails from './pages/PaperDetails';

function App() {
  return (
    <PaperProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-paper" element={<AddPaper />} />
            <Route path="edit-paper/:id" element={<AddPaper />} />
            <Route path="paper/:id" element={<PaperDetails />} />
          </Route>
        </Routes>
      </Router>
    </PaperProvider>
  );
}

export default App;