import api from './api';

export const getAllUsers = async () => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch users' };
  }
};
