import axios from "axios";

const BASE_URL = 'https://nodebackend-vv0e.onrender.com/api/v1';
// Getting all the tests
export const getAllTests = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/test`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Getting the single test by id
export const getSingleTest = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/test/find/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Add the test to db
export const addTest = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/test/registerTest`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Edit the test by id
export const updateTest = async (id, payload) => {
    try {
        const response = await axios.patch(`${BASE_URL}/test/updateTest/${id}`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Delete the test by id
export const deleteTest = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/test/deleteTest/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};
