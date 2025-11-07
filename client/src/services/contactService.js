import api from './api';

export const submitContact = async (payload) => {
  const res = await api.post('/contact', payload);
  return res.data;
};

export const getContacts = async () => {
  const res = await api.get('/contact');
  return res.data;
};
