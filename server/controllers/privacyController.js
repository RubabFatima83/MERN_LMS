const Privacy = require('../models/Privacy');

const addPrivacy = async (req, res) => {
  try {
    const privacy = new Privacy(req.body);
    await privacy.save();
    res.status(201).json(privacy);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add privacy policy' });
  }
};

const getPrivacy = async (req, res) => {
  try {
    const privacyList = await Privacy.find().sort({ createdAt: -1 });
    res.json(privacyList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch privacy policies' });
  }
};

const getPrivacyById = async (req, res) => {
  try {
    const privacy = await Privacy.findById(req.params.id, req.body);
    if(!privacy) return res.status(404).json({error: 'Privacy policy not found'})
    res.json(privacy);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch privacy policy' });
  }
};

const updatePrivacy = async (req, res) => {
  try {
    const updated = await Privacy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!updated) return res.status(404).json({error: 'Privacy policy not found'})
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

const deletePrivacy = async (req, res) => {
  try {
    const privacy = await Privacy.findByIdAndDelete(req.params.id);
    if(!privacy) return res.status(404).json({error: 'Privacy policy not found'})
    res.json({ message: 'Privacy policy deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

module.exports = {addPrivacy, getPrivacy, getPrivacyById, updatePrivacy, deletePrivacy}