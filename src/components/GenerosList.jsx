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
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Géneros</h1>
                <Link 
                    to="/generos/nuevo" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
                >
                    Añadir Género
                </Link>
            </div>

            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <ul className="divide-y divide-slate-200">
                    {generos.map(genero => (
                        // Item de lista responsive
                        <li key={genero.id} className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center">
                            <div className="flex items-center mb-4 sm:mb-0">
                                {genero.icono ? (
                                    <img 
                                        src={genero.icono} 
                                        alt={genero.nombre} 
                                        className="w-16 h-16 rounded-lg mr-4 object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-lg mr-4 bg-slate-200 flex-shrink-0"></div>
                                )}
                                <div>
                                    <p className="text-lg font-semibold text-slate-800">{genero.nombre}</p>
                                    <p className="text-sm text-slate-600 truncate max-w-xs">{genero.descripcion}</p>
                                </div>
                            </div>
                            <div className="flex space-x-3 self-end sm:self-auto">
                                <Link 
                                    to={`/generos/editar/${genero.id}`} 
                                    className="text-sm bg-amber-500 text-white px-3 py-1 rounded-md shadow-sm hover:bg-amber-600 transition-colors"
                                >
                                    Editar
                                </Link>
                                <button 
                                    onClick={() => handleEliminar(genero.id)}
                                    className="text-sm bg-red-600 text-white px-3 py-1 rounded-md shadow-sm hover:bg-red-700 transition-colors"
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