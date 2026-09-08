import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">📊 ERP Varejo</h1>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Olá, <strong>{user.nome}</strong></span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;