import express from 'express';
import { criar, listar, obter, atualizar, deletar } from '../controllers/produtosController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, criar);
router.get('/', authMiddleware, listar);
router.get('/:id', authMiddleware, obter);
router.put('/:id', authMiddleware, atualizar);
router.delete('/:id', authMiddleware, deletar);

export default router;