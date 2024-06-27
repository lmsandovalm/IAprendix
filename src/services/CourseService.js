import axios from "axios";

const BASE_URL = 'https://nodebackend-vv0e.onrender.com/api/v1';

// Getting all the courses
export const getAllCourses = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/courses`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Getting the single course by id
export const getSingleCourse = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/find/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Add the course to db
export const addCourse = async (payload) => {
    try {
        const response = await axios.post(`${BASE_URL}/courses/registerCourse`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Edit the course by id
export const updateCourse = async (id, payload) => {
    try {
        const response = await axios.patch(`${BASE_URL}/courses/update/${id}`, { ...payload });
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};

// Delete the course by id
export const deleteCourse = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/courses/delete/${id}`);
        if (response.data) {
            return response.data;
        }
    } catch (err) {
        throw err;
    }
};
