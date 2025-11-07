import api from './api';

// Get all trainers
export const getAllTrainers = async () => {
  try {
    const response = await api.get('/trainers');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch trainers' };
  }
};

// Get single trainer by ID
export const getTrainerById = async (trainerId) => {
  try {
    const response = await api.get(`/trainers/${trainerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch trainer details' };
  }
};

// Admin: Create a new trainer
export const createTrainer = async (trainerData) => {
  try {
    const response = await api.post('/trainers', trainerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to create trainer' };
  }
};

// Admin: Update a trainer
export const updateTrainer = async (trainerId, trainerData) => {
  try {
    const response = await api.put(`/trainers/${trainerId}`, trainerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update trainer' };
  }
};

// Admin: Delete a trainer
export const deleteTrainer = async (trainerId) => {
  try {
    const response = await api.delete(`/trainers/${trainerId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to delete trainer' };
  }
};

// Admin: Upload trainer photo
export const uploadTrainerPhoto = async (trainerId, formData) => {
  try {
    const response = await api.put(`/trainers/${trainerId}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to upload trainer photo' };
  }
};

// Admin: Update trainer schedule
export const updateTrainerSchedule = async (trainerId, scheduleData) => {
  try {
    const response = await api.put(`/trainers/${trainerId}/schedule`, scheduleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update trainer schedule' };
  }
};