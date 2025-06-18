const Terms = require('../models/terms.js');

// Get current Terms
const getTerms = async (req, res) => {
  try {
    const terms = await Terms.find().sort({ createdAt: -1 });
    res.json(terms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Terms' });
  }
};

// Get by ID
const getTermById = async (req, res) => {
  try {
    const term = await Terms.findById(
      req.params.id, req.body,
    );
    if (!term) return res.status(404).json({ error: 'Term not found' });
    res.json(term);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Term' });
  }
};

// Add new Terms
const addTerms = async (req, res) => {
  try {
    const terms = new Terms(req.body);
    await terms.save();
    res.status(201).json(terms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add Terms' });
  }
};

// Update Terms
const updateTerms = async (req, res) => {
  try {
    const updated = await Terms.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Term not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update Terms' });
  }
};

// Delete Terms (optional)
const deleteTerms = async (req, res) => {
  try {
    const term = await Terms.findByIdAndDelete(req.params.id);
    if (!term) return res.status(404).json({ error: 'Term not found' });
    res.json({ message: 'Terms deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete Terms' });
  }
};

module.exports = {addTerms, getTerms, getTermById, updateTerms, deleteTerms}