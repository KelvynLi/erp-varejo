import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ERP Varejo API is running' });
});

// Rotas (serão importadas aqui)
// import authRoutes from './routes/auth.js';
// import produtosRoutes from './routes/produtos.js';
// import estoqueRoutes from './routes/estoque.js';
// import vendasRoutes from './routes/vendas.js';
// import clientesRoutes from './routes/clientes.js';
// import relatoriosRoutes from './routes/relatorios.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/produtos', produtosRoutes);
// app.use('/api/estoque', estoqueRoutes);
// app.use('/api/vendas', vendasRoutes);
// app.use('/api/clientes', clientesRoutes);
// app.use('/api/relatorios', relatoriosRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`🚀 ERP Varejo Backend rodando em http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
});

export default app;