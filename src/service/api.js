/**
 * API Service - handles all HTTP requests
 */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const ApiService = {
  sendEmail: async (emailData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/email`, emailData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('API Error:', error.message);
      return { success: false, error: error.message };
    }
  }
};
