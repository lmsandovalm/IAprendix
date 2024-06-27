import axios from "axios";

const BASE_URL = 'https://nodebackend-vv0e.onrender.com/api/v1';
// Getting all the topics
export const getAllTopics = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/topics`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Getting the single topic by id
export const getSingleTopic = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/findTopicByIdWithMaterials/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Add the topic to db
export const addTopic = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/courses/registerTopic`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Edit the topic by id
export const updateTopic = async (id, payload) => {
    try {
        const response = await axios.patch(`${BASE_URL}/courses/updateTopic/${id}`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Delete the topic by id
export const deleteTopic = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/courses/deleteTopic/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};
