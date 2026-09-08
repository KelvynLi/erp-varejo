import React, { useState, useContext, createContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/login', { email, senha });
      setToken(data.token);
      setUser(data.usuario);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registrar = async (nome, email, senha) => {
    setLoading(true);
    try {
      const { data } = await axios.post('/api/auth/registrar', { nome, email, senha });
      setError(null);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao registrar');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, registrar, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);