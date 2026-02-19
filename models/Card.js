import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  suit: {
    type: String,
    required: [true, 'Suit is required'],
    enum: ['Hearts', 'Diamonds', 'Clubs', 'Spades']
  },
  rank: {
    type: String,
    required: [true, 'Rank is required'],
    enum: ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King']
  },
  description: { type: String },
  quantity:    { type: Number, default: 1 },
  author: {
    name: { type: String, required: [true, 'Author name is required'] }
  }
}, { timestamps: true });

export default mongoose.model('Card', cardSchema);