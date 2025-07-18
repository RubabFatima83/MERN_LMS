const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({

    name: String,
    email: String,
    subject: String,
    message: String,
    reply: String

}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
