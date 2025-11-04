import axios from 'axios';

const API_URL = os.environ.get('VITE_API_URL', 'https://peliculas-backend.onrender.com/api/');

const apiClient = axios.create({
    baseURL: API_URL
});

export default apiClient;