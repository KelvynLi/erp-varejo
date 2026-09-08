import React from 'react';
import { useAuth } from '../context/AuthContext';
import { redirect } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <redirect to="/login" />;
  }

  return children;
};

export default PrivateRoute;