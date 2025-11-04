import React, { useEffect, useState } from 'react';
import apiClient from '../api/axios';
import { Link } from 'react-router-dom';

function GenerosList() {
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        cargarGeneros();
    }, []);

    const cargarGeneros = async () => {
        try {
            const response = await apiClient.get('/generos/');
            setGeneros(response.data);
        } catch (error) {
            console.error("Error al cargar géneros:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este género?")) {
            try {
                await apiClient.delete(`/generos/${id}/`);
                setGeneros(generos.filter(g => g.id !== id));
            } catch (error) {
                console.error("Error al eliminar género:", error);
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista de Géneros</h1>
            <Link to="/generos/nuevo" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600">
                Añadir Género
            </Link>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {generos.map(genero => (
                        <li key={genero.id} className="p-4 flex justify-between items-center">
                            <div>
                                <p className="text-lg font-medium text-gray-900">{genero.nombre}</p>
                                <p className="text-sm text-gray-500">{genero.descripcion}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Link to={`/generos/editar/${genero.id}`} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(genero.id)}
                                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GenerosList;