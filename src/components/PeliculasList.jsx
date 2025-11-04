import React, { useEffect, useState } from 'react';
import apiClient from '../api/axios';
import { Link } from 'react-router-dom';

function PeliculasList() {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        cargarPeliculas();
    }, []);

    const cargarPeliculas = async () => {
        try {
            const response = await apiClient.get('/peliculas/');
            setPeliculas(response.data);
        } catch (error) {
            console.error("Error al cargar películas:", error);
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta película?")) {
            try {
                await apiClient.delete(`/peliculas/${id}/`);
                setPeliculas(peliculas.filter(p => p.id !== id));
            } catch (error) {
                console.error("Error al eliminar película:", error);
            }
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista de Películas</h1>
            <Link to="/peliculas/nueva" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-600">
                Añadir Película
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {peliculas.map(pelicula => (
                    <div key={pelicula.id} className="border rounded-lg shadow-lg overflow-hidden bg-white">
                        {pelicula.poster && (
                            <img 
                                src={pelicula.poster} 
                                alt={pelicula.titulo} 
                                className="w-full h-80 object-cover" 
                            />
                        )}
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{pelicula.titulo} ({pelicula.ano_lanzamiento})</h2>
                            <p className="text-gray-600">Director: {pelicula.director}</p>
                            
                            {/* --- CAMBIO AQUÍ --- */}
                            {/* Mostramos la duración solo si existe */}
                            {pelicula.duracion && (
                                <p className="text-gray-600">Duración: {pelicula.duracion} min.</p>
                            )}
                            {/* --- FIN DEL CAMBIO --- */}

                            <div className="mt-4 flex justify-between items-center">
                                <Link to={`/peliculas/editar/${pelicula.id}`} className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(pelicula.id)}
                                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PeliculasList;