import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function PeliculaForm() {
    const [titulo, setTitulo] = useState('');
    const [director, setDirector] = useState('');
    const [ano, setAno] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [poster, setPoster] = useState(null);
    const [duracion, setDuracion] = useState('');
    
    const [generos, setGeneros] = useState([]);
    
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        apiClient.get('/generos/').then(response => {
            setGeneros(response.data);
        }).catch(error => console.error(error));

        if (id) {
            apiClient.get(`/peliculas/${id}/`).then(response => {
                const p = response.data;
                setTitulo(p.titulo);
                setDirector(p.director);
                setAno(p.ano_lanzamiento);
                setGeneroId(p.genero);
                setDuracion(p.duracion || '');
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // ... (resto de la lógica de FormData)
        formData.append('titulo', titulo);
        formData.append('director', director);
        formData.append('ano_lanzamiento', ano);
        formData.append('genero', generoId);
        formData.append('duracion', duracion || 0); // Enviar 0 si está vacío
        if (poster) formData.append('poster', poster);

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            if (id) {
                await apiClient.patch(`/peliculas/${id}/`, formData, config);
            } else {
                await apiClient.post('/peliculas/', formData, config);
            }
            navigate('/peliculas');
        } catch (error) {
            console.error("Error al guardar la película:", error);
        }
    };

    return (
        // Contenedor del formulario
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl space-y-6">
            <h1 className="text-3xl font-bold text-slate-900">{id ? "Editar Película" : "Nueva Película"}</h1>
            
            {/* Contenedor de grilla para campos, 2 columnas en desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Título */}
                <div className="md:col-span-2">
                    <label htmlFor="titulo" className="block text-sm font-medium text-slate-700 mb-1">Título</label>
                    <input 
                        type="text" id="titulo" value={titulo} onChange={e => setTitulo(e.target.value)} required 
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                
                {/* Campo Director */}
                <div>
                    <label htmlFor="director" className="block text-sm font-medium text-slate-700 mb-1">Director</label>
                    <input 
                        type="text" id="director" value={director} onChange={e => setDirector(e.target.value)} required
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                
                {/* Campo Año */}
                <div>
                    <label htmlFor="ano" className="block text-sm font-medium text-slate-700 mb-1">Año de Lanzamiento</label>
                    <input 
                        type="number" id="ano" value={ano} onChange={e => setAno(e.target.value)} required
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                
                {/* Campo Duración */}
                <div>
                    <label htmlFor="duracion" className="block text-sm font-medium text-slate-700 mb-1">Duración (minutos)</label>
                    <input 
                        type="number" id="duracion" value={duracion} onChange={e => setDuracion(e.target.value)}
                        placeholder="Ej: 120"
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>

                {/* Campo Género */}
                <div>
                    <label htmlFor="genero" className="block text-sm font-medium text-slate-700 mb-1">Género</label>
                    <select 
                        id="genero" value={generoId} onChange={e => setGeneroId(e.target.value)} required
                        className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-3 bg-white focus:ring-indigo-500 focus:border-indigo-500">
                        <option value="">Selecciona un género</option>
                        {generos.map(g => (
                            <option key={g.id} value={g.id}>{g.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Campo de Archivo (Póster) */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Póster</label>
                <input 
                    type="file" 
                    onChange={e => setPoster(e.target.files[0])}
                    className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-colors" />
            </div>

            {/* Botón de Enviar */}
            <div className="md:col-span-2 pt-4">
                <button 
                    type="submit" 
                    className="w-full flex justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                    Guardar Película
                </button>
            </div>
        </form>
    );
}

export default PeliculaForm;