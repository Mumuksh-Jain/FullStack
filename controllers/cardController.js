import Card from '../models/Card.js';

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.status(200).json({ success: true, data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCardsBySuit = async (req, res) => {
  try {
    const cards = await Card.find({ suit: req.params.suit });
    res.status(200).json({ success: true, count: cards.length, data: cards });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCard = async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(201).json({ success: true, message: 'Card added successfully', data: card });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.status(200).json({ success: true, message: 'Card updated successfully', data: card });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ success: false, message: 'Card not found' });
    res.status(200).json({ success: true, message: 'Card deleted successfully', data: card });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};