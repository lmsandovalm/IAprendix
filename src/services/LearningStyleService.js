import axios from "axios";

const BASE_URL = 'https://nodebackend-vv0e.onrender.com/api/v1/learningStyle';

// Getting all the courses
export const getAllLearningStyles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};
