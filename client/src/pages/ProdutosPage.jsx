import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const ProdutosPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    descricao: '',
    preco_custo: '',
    preco_venda: '',
    sku: ''
  });

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const { data } = await axios.get('/api/produtos');
      setProdutos(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/produtos', formData);
      setFormData({ codigo: '', nome: '', descricao: '', preco_custo: '', preco_venda: '', sku: '' });
      setShowForm(false);
      fetchProdutos();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza?')) {
      try {
        await axios.delete(`/api/produtos/${id}`);
        fetchProdutos();
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  if (loading) return <div className="p-8 text-center">Carregando...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📦 Produtos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600"
        >
          <Plus size={20} />
          <span>Novo Produto</span>
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Código"
                value={formData.codigo}
                onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Preço de Custo"
                step="0.01"
                value={formData.preco_custo}
                onChange={(e) => setFormData({ ...formData, preco_custo: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Preço de Venda"
                step="0.01"
                value={formData.preco_venda}
                onChange={(e) => setFormData({ ...formData, preco_venda: e.target.value })}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <textarea
              placeholder="Descrição"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-4"
              rows="3"
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 mt-4"
            >
              Criar Produto
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-lg font-bold mb-2">{produto.nome}</h3>
            <p className="text-sm text-gray-600 mb-2">Código: <strong>{produto.codigo}</strong></p>
            <p className="text-sm text-gray-600 mb-2">Estoque: <strong>{produto.quantidade}</strong></p>
            <div className="bg-gray-100 p-2 rounded mb-4">
              <p className="text-sm">Custo: R$ {parseFloat(produto.preco_custo).toFixed(2)}</p>
              <p className="text-sm">Venda: R$ {parseFloat(produto.preco_venda).toFixed(2)}</p>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-1">
                <Edit2 size={16} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDelete(produto.id)}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 flex items-center justify-center space-x-1"
              >
                <Trash2 size={16} />
                <span>Deletar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProdutosPage;