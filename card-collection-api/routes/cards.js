import express from 'express';
import {
  getAllCards,
  getCardById,
  getCardsBySuit,
  createCard,
  updateCard,
  deleteCard
} from '../controllers/cardController.js';

const router = express.Router();

router.get('/',           getAllCards);
router.get('/suit/:suit', getCardsBySuit);
router.get('/:id',        getCardById);
router.post('/',          createCard);
router.put('/:id',        updateCard);
router.delete('/:id',     deleteCard);

export default router;