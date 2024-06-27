import axios from "axios";

const BASE_URL = 'https://nodebackend-vv0e.onrender.com/api/v1';

// Getting all the material topics
export const getAllMaterialTopics = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/materialsTopics`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Getting the single material topic by id
export const getSingleMaterialTopic = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/findMaterialTopic/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Add the material topic to db
export const addMaterialTopic = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/courses/registerMaterialTopic`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Edit the material topic by id
export const updateMaterialTopic = async (id, payload) => {
    try {
        const response = await axios.patch(`${BASE_URL}/courses/updateMaterialTopic/${id}`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Delete the material topic by id
export const deleteMaterialTopic = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/courses/deleteMaterialTopic/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};
