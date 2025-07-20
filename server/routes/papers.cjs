const express = require('express');
const router = express.Router();
const Paper = require('../models/Paper.cjs');

// GET /api/papers - Get all papers with optional search and filter
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    // Add search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Add category filter
    if (category && category !== '') {
      query.category = category;
    }
    
    const papers = await Paper.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Paper.countDocuments(query);
    
    res.json({
      papers,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error fetching papers:', error);
    res.status(500).json({ message: 'Error fetching papers', error: error.message });
  }
});

// GET /api/papers/:id - Get single paper
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(paper);
  } catch (error) {
    console.error('Error fetching paper:', error);
    res.status(500).json({ message: 'Error fetching paper', error: error.message });
  }
});

// POST /api/papers - Create new paper
router.post('/', async (req, res) => {
  try {
    const paper = new Paper(req.body);
    const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    console.error('Error creating paper:', error);
    res.status(400).json({ message: 'Error creating paper', error: error.message });
  }
});

// PUT /api/papers/:id - Update paper
router.put('/:id', async (req, res) => {
  try {
    const paper = await Paper.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json(paper);
  } catch (error) {
    console.error('Error updating paper:', error);
    res.status(400).json({ message: 'Error updating paper', error: error.message });
  }
});

// DELETE /api/papers/:id - Delete paper
router.delete('/:id', async (req, res) => {
  try {
    const paper = await Paper.findByIdAndDelete(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    res.json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Error deleting paper:', error);
    res.status(500).json({ message: 'Error deleting paper', error: error.message });
  }
});

module.exports = router;