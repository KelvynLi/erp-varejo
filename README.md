# ERP Varejo

Sistema ERP completo para comércio e varejo. Funciona em qualquer computador via navegador web.

## 🎯 Funcionalidades

- ✅ **Ponto de Venda (PDV)** - Registro rápido de vendas
- ✅ **Gestão de Estoque** - Controle de produtos e quantidades
- ✅ **Cadastro de Produtos** - Gerenciamento completo
- ✅ **Controle de Clientes** - CRM integrado
- ✅ **Vendas e Pedidos** - Histórico completo
- ✅ **Relatórios** - Análise de vendas e lucros
- ✅ **Controle de Usuários** - Sistema de permissões
- ✅ **Caixa/Financeiro** - Gestão de caixa

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT
- **Segurança**: bcryptjs para hashing de senhas

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- PostgreSQL 12+ instalado e rodando

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/KelvynLi/erp-varejo.git
cd erp-varejo
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite .env com suas configurações
```

3. Instale as dependências:
```bash
npm install
cd client && npm install && cd ..
```

4. Configure o banco de dados:
```bash
npm run db:setup
```

5. Inicie o desenvolvimento:
```bash
npm run dev
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:3000

## 📁 Estrutura do Projeto

```
erp-varejo/
├── server/
│   ├── index.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── produtos.js
│   │   ├── estoque.js
│   │   ├── vendas.js
│   │   ├── clientes.js
│   │   └── relatorios.js
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── database/
│   └── config/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx
│   └── package.json
├── package.json
├── .env.example
└── README.md
```

## 🚀 Deploy

O sistema pode ser deployed em plataformas como:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS/Azure/Google Cloud

## 📝 Licença

MIT
