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
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogo de Películas</h1>
                <Link 
                    to="/peliculas/nueva" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                >
                    Añadir Película
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {peliculas.map(pelicula => (
                    <div 
                        key={pelicula.id} 
                        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                    >
                        {pelicula.poster ? (
                            <img 
                                src={pelicula.poster} 
                                alt={pelicula.titulo} 
                                className="w-full h-80 object-cover"
                            />
                        ) : (
                            <div className="w-full h-80 bg-slate-200 flex items-center justify-center">
                                <span className="text-slate-500">Sin póster</span>
                            </div>
                        )}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-slate-800 mb-1 truncate">{pelicula.titulo}</h2>
                            <p className="text-sm text-slate-600 mb-2">({pelicula.ano_lanzamiento})</p>
                            <p className="text-sm text-slate-600 mb-1"><strong>Director:</strong> {pelicula.director}</p>
                            
                            {pelicula.duracion && (
                                <p className="text-sm text-slate-600 mb-4"><strong>Duración:</strong> {pelicula.duracion} min.</p>
                            )}
                            
                            <div className="mt-4 flex justify-end space-x-3">
                                <Link 
                                    to={`/peliculas/editar/${pelicula.id}`} 
                                    className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-amber-600 transition-colors"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(pelicula.id)}
                                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-700 transition-colors"
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