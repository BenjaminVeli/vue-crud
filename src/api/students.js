import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

export const getStudents = () => {
    return axios.get(`${API_URL}/students`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error getting students: ', error);
            throw error;
        })
}

export const postStudent = (studentData) => {
    return axios.post(`${API_URL}/students`, studentData)
        .then(response => response.data)
        .catch(error => {
            console.error('Error creating student: ', error);
            throw error;
        });
}