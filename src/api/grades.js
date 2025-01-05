import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';

export const getGrades = () => {
    return axios.get(`${API_URL}/grades`)
        .then(response => response.data)
        .catch(error => {
            console.error('Error getting grades: ', error);
            throw error;
        })
}