import api from './api';

// Get all classes
export const getAllClasses = async () => {
  try {
    const response = await api.get('/classes');
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch classes' };
  }
};

// Get single class by ID
export const getClassById = async (classId) => {
  try {
    const response = await api.get(`/classes/${classId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to fetch class details' };
  }
};

// Enroll in a class
export const enrollInClass = async (enrollmentData) => {
  try {
    const { classId, ...formData } = enrollmentData;
    const response = await api.post(`/users/enroll/${classId}`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to enroll in class' };
  }
};

// Admin: Create a new class
export const createClass = async (classData) => {
  try {
    const response = await api.post('/classes', classData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to create class' };
  }
};

// Admin: Update a class
export const updateClass = async (classId, classData) => {
  try {
    const response = await api.put(`/classes/${classId}`, classData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update class' };
  }
};

// Admin: Delete a class
export const deleteClass = async (classId) => {
  try {
    const response = await api.delete(`/classes/${classId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to delete class' };
  }
};

// Admin: Upload class image
export const uploadClassImage = async (classId, formData) => {
  try {
    const response = await api.put(`/classes/${classId}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to upload class image' };
  }
};

// Admin: Update class routine
export const updateClassRoutine = async (classId, routineData) => {
  try {
    const response = await api.put(`/classes/${classId}/routine`, routineData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { success: false, message: 'Failed to update class routine' };
  }
};