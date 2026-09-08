import pool from '../config/database.js';

const criar = async (req, res) => {
  const { codigo, nome, descricao, preco_custo, preco_venda, categoria_id, sku } = req.body;

  try {
    const resultado = await pool.query(
      `INSERT INTO produtos (codigo, nome, descricao, preco_custo, preco_venda, categoria_id, sku)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [codigo, nome, descricao, preco_custo, preco_venda, categoria_id, sku]
    );

    // Criar registro de estoque
    await pool.query(
      'INSERT INTO estoque (produto_id, quantidade) VALUES ($1, $2)',
      [resultado.rows[0].id, 0]
    );

    res.status(201).json({ message: 'Produto criado com sucesso', produto: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

const listar = async (req, res) => {
  try {
    const resultado = await pool.query(
      `SELECT p.*, c.nome as categoria, e.quantidade
       FROM produtos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       LEFT JOIN estoque e ON p.id = e.produto_id
       WHERE p.ativo = true
       ORDER BY p.nome`
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
};

const obter = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      `SELECT p.*, c.nome as categoria, e.quantidade
       FROM produtos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       LEFT JOIN estoque e ON p.id = e.produto_id
       WHERE p.id = $1`,
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro ao obter produto' });
  }
};

const atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco_custo, preco_venda, categoria_id } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE produtos 
       SET nome = $1, descricao = $2, preco_custo = $3, preco_venda = $4, categoria_id = $5, atualizado_em = CURRENT_TIMESTAMP
       WHERE id = $6
       RETURNING *`,
      [nome, descricao, preco_custo, preco_venda, categoria_id, id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto atualizado com sucesso', produto: resultado.rows[0] });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

const deletar = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      'UPDATE produtos SET ativo = false WHERE id = $1 RETURNING *',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

export { criar, listar, obter, atualizar, deletar };