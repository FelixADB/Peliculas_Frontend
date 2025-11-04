import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function GeneroForm() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [popularidad, setPopularidad] = useState(0); 
    const [icono, setIcono] = useState(null);
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            apiClient.get(`/generos/${id}/`).then(response => {
                const g = response.data;
                setNombre(g.nombre);
                setDescripcion(g.descripcion || '');
                setPopularidad(g.popularidad || 0);
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // ... (resto de la lógica de FormData)
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('popularidad', popularidad);
        if (icono) formData.append('icono', icono);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            if (id) {
                await apiClient.patch(`/generos/${id}/`, formData, config);
            } else {
                await apiClient.post('/generos/', formData, config);
            }
            navigate('/generos');
        } catch (error) {
            console.error("Error al guardar el género:", error);
        }
    };

    return (
        // Contenedor del formulario
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">{id ? "Editar Género" : "Nuevo Género"}</h1>
            
            {/* Campo Nombre */}
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input 
                    type="text" id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} required 
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            
            {/* Campo Descripción */}
            <div>
                <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea 
                    id="descripcion" value={descripcion} onChange={e => setDescripcion(e.target.value)}
                    rows="4"
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo Popularidad */}
            <div>
                <label htmlFor="popularidad" className="block text-sm font-medium text-slate-700 mb-1">Popularidad</label>
                <input 
                    type="number" id="popularidad" value={popularidad} onChange={e => setPopularidad(e.target.value)}
                    className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            {/* Campo de Archivo (Icono) */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Icono del Género</label>
                <input 
                    type="file" 
                    onChange={e => setIcono(e.target.files[0])}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
            </div>

            {/* Botón de Enviar */}
            <div className="pt-4">
                <button 
                    type="submit" 
                    className="w-full flex justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                    Guardar Género
                </button>
            </div>
        </form>
    );
}

export default GeneroForm;