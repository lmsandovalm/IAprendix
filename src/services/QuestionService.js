// services/QuestionService.js
import axios from 'axios';

const baseURL = 'https://nodebackend-vv0e.onrender.com/api/v1/test';

export const registerQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${baseURL}/registerQuestion`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error registering question:', error);
    throw error;
  }
};
