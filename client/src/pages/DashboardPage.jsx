import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Package, Users, BarChart3 } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();

  const cards = [
    { title: 'Vendas', icon: ShoppingCart, color: 'bg-blue-500', value: '0' },
    { title: 'Produtos', icon: Package, color: 'bg-green-500', value: '0' },
    { title: 'Clientes', icon: Users, color: 'bg-purple-500', value: '0' },
    { title: 'Relatórios', icon: BarChart3, color: 'bg-orange-500', value: '0' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Bem-vindo, <strong>{user?.nome}</strong>! 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                <div className={`${card.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-700">{card.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Últimas Vendas</h2>
          <p className="text-gray-600">Nenhuma venda registrada ainda.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Produtos com Estoque Baixo</h2>
          <p className="text-gray-600">Todos os produtos têm estoque adequado.</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;