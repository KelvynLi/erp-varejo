import express from 'express';
import { registrar, login } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/registrar', registrar);
router.post('/login', login);
router.get('/verificar', authMiddleware, (req, res) => {
  res.json({ usuario: req.user });
});

export default router;