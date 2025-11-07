import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Spinner from '../ui/Spinner';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  const isAdmin = user?.role === 'admin' || user?.roleBase === 1;
  return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
};

export default AdminRoute;