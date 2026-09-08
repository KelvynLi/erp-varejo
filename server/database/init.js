import pool from '../config/database.js';

const initDB = async () => {
  const client = await pool.connect();
  
  try {
    console.log('Inicializando banco de dados...');

    // Tabela de usuários
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'operador',
        ativo BOOLEAN DEFAULT true,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de categorias
    await client.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL UNIQUE,
        descricao TEXT,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de produtos
    await client.query(`
      CREATE TABLE IF NOT EXISTS produtos (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(100) UNIQUE NOT NULL,
        nome VARCHAR(255) NOT NULL,
        descricao TEXT,
        preco_custo DECIMAL(10, 2) NOT NULL,
        preco_venda DECIMAL(10, 2) NOT NULL,
        categoria_id INTEGER REFERENCES categorias(id),
        sku VARCHAR(100),
        ativo BOOLEAN DEFAULT true,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de estoque
    await client.query(`
      CREATE TABLE IF NOT EXISTS estoque (
        id SERIAL PRIMARY KEY,
        produto_id INTEGER NOT NULL REFERENCES produtos(id),
        quantidade INTEGER NOT NULL DEFAULT 0,
        quantidade_minima INTEGER DEFAULT 10,
        localizacao VARCHAR(100),
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de clientes
    await client.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telefone VARCHAR(20),
        cpf_cnpj VARCHAR(20) UNIQUE,
        endereco TEXT,
        cidade VARCHAR(100),
        estado VARCHAR(2),
        cep VARCHAR(10),
        ativo BOOLEAN DEFAULT true,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de vendas
    await client.query(`
      CREATE TABLE IF NOT EXISTS vendas (
        id SERIAL PRIMARY KEY,
        numero_nota VARCHAR(50) UNIQUE,
        cliente_id INTEGER REFERENCES clientes(id),
        usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
        data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        subtotal DECIMAL(12, 2) NOT NULL,
        desconto DECIMAL(12, 2) DEFAULT 0,
        total DECIMAL(12, 2) NOT NULL,
        metodo_pagamento VARCHAR(50),
        status VARCHAR(50) DEFAULT 'concluida',
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Tabela de itens da venda
    await client.query(`
      CREATE TABLE IF NOT EXISTS vendas_itens (
        id SERIAL PRIMARY KEY,
        venda_id INTEGER NOT NULL REFERENCES vendas(id) ON DELETE CASCADE,
        produto_id INTEGER NOT NULL REFERENCES produtos(id),
        quantidade INTEGER NOT NULL,
        preco_unitario DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(12, 2) NOT NULL
      );
    `);

    // Tabela de caixa
    await client.query(`
      CREATE TABLE IF NOT EXISTS caixa (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
        abertura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        fechamento TIMESTAMP,
        valor_abertura DECIMAL(12, 2) DEFAULT 0,
        valor_fechamento DECIMAL(12, 2),
        total_vendas DECIMAL(12, 2),
        status VARCHAR(50) DEFAULT 'aberto'
      );
    `);

    // Tabela de movimentações de estoque
    await client.query(`
      CREATE TABLE IF NOT EXISTS movimentacoes_estoque (
        id SERIAL PRIMARY KEY,
        produto_id INTEGER NOT NULL REFERENCES produtos(id),
        tipo VARCHAR(50) NOT NULL,
        quantidade INTEGER NOT NULL,
        motivo TEXT,
        usuario_id INTEGER REFERENCES usuarios(id),
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Índices para melhor performance
    await client.query(`CREATE INDEX IF NOT EXISTS idx_produtos_codigo ON produtos(codigo);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_vendas_usuario ON vendas(usuario_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_vendas_cliente ON vendas(cliente_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_estoque_produto ON estoque(produto_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_movimentacoes_produto ON movimentacoes_estoque(produto_id);`);

    console.log('✅ Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    throw error;
  } finally {
    client.release();
  }
};

initDB().catch(console.error);