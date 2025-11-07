import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.data);
        setIsAuthenticated(true);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        setToken(res.data.token);
        setUser(res.data.data);
        setIsAuthenticated(true);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      return false;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await axios.get('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put('/api/users/profile', userData);
      
      if (res.data.success) {
        setUser(res.data.data);
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      return false;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post('/api/auth/forgotpassword', { email });
      
      if (res.data.success) {
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
      return false;
    }
  };

  // Reset password
  const resetPassword = async (resetToken, password) => {
    try {
      const res = await axios.put(`/api/auth/resetpassword/${resetToken}`, { password });
      
      if (res.data.success) {
        setError(null);
        return true;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
      return false;
    }
  };

  // Clear errors
  const clearErrors = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;