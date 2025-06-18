const Contact = require('../models/contactform'); 
const sendEmail = require('../utils/sendEmail');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save to DB
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error, please try again later.' });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id)
    res.status(200).json(message)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' })
  }
}

const deleteMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id)
    res.status(200).json('Message Deleted successfully!')
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' })
  }
}

const replyToMessage = async (req, res) => {
  const { email, subject, message, id } = req.body;

  if (!email || !subject || !message || !id) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // ✅ Send email
    await sendEmail({
      email,
      subject,
      html: `<p>${message}</p>`,
    });

    // ✅ Save reply to the specific message by id
    const contact = await Contact.findByIdAndUpdate(
      id,
      { reply: message },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({ message: "Reply sent and saved!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply." });
  }
};

module.exports = { sendContactMessage, getAllMessages, getMessageById, deleteMessageById, replyToMessage };
