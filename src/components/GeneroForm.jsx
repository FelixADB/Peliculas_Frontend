import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function GeneroForm() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    // Campos extra del modelo Genero
    const [popularidad, setPopularidad] = useState(0); 
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            apiClient.get(`/generos/${id}/`).then(response => {
                const g = response.data;
                setNombre(g.nombre);
                setDescripcion(g.descripcion);
                setPopularidad(g.popularidad || 0);
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Aquí no usamos FormData porque no hay archivos
        const data = {
            nombre,
            descripcion,
            popularidad
        };

        try {
            if (id) {
                await apiClient.put(`/generos/${id}/`, data);
            } else {
                await apiClient.post('/generos/', data);
            }
            navigate('/generos');
        } catch (error) {
            console.error("Error al guardar el género:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6">{id ? "Editar Género" : "Nuevo Género"}</h1>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} required 
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)}
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Popularidad</label>
                <input type="number" value={popularidad} onChange={e => setPopularidad(e.target.value)}
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-medium">
                Guardar Género
            </button>
        </form>
    );
}

export default GeneroForm;