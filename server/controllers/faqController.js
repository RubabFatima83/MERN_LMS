// controllers/faqController.js
const FAQ = require('../models/faqModel.js');

const getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find().sort({ createdAt: -1 });
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch FAQs' });
    }
};

const getFAQById = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id, req.body, );
        if (!faq) return res.status(404).json({ error: 'FAQ not found' });
        res.json(faq);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get FAQ' });
    }
};

const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFaq = new FAQ({ question, answer });
        await newFaq.save();
        res.status(201).json(newFaq);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create FAQ' });
    }
};

const updateFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!faq) return res.status(404).json({ error: 'FAQ not found' });
        res.json(faq);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update FAQ' });
    }
};

const deleteFAQ = async (req, res) => {
    try {
        const faq = await FAQ.findByIdAndDelete(req.params.id);
        if (!faq) return res.status(404).json({ error: 'FAQ not found' });
        res.json({ message: 'FAQ deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete FAQ' });
    }
};

module.exports = { createFAQ, getFAQs, getFAQById, updateFAQ, deleteFAQ }
