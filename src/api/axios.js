import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://peliculas-backend-zj33.onrender.com/api/'
});

export default apiClient;