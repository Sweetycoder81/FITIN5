import api from './api';

// Get all membership plans
export const getAllMemberships = async () => {
  try {
    const response = await api.get('/memberships');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch membership plans' };
  }
};

// Get single membership plan by ID
export const getMembershipById = async (membershipId) => {
  try {
    const response = await api.get(`/memberships/${membershipId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch membership details' };
  }
};

// Subscribe to a membership plan
export const subscribeToPlan = async (membershipId, paymentDetails) => {
  try {
    const response = await api.post(`/users/subscribe/${membershipId}`, paymentDetails);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to subscribe to plan' };
  }
};

// Admin: Create a new membership plan
export const createMembership = async (membershipData) => {
  try {
    const response = await api.post('/memberships', membershipData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to create membership plan' };
  }
};

// Admin: Update a membership plan
export const updateMembership = async (membershipId, membershipData) => {
  try {
    const response = await api.put(`/memberships/${membershipId}`, membershipData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update membership plan' };
  }
};

// Admin: Delete a membership plan
export const deleteMembership = async (membershipId) => {
  try {
    const response = await api.delete(`/memberships/${membershipId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to delete membership plan' };
  }
};