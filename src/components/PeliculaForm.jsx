import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function PeliculaForm() {
    const [titulo, setTitulo] = useState('');
    const [director, setDirector] = useState('');
    const [ano, setAno] = useState('');
    const [generoId, setGeneroId] = useState('');
    const [poster, setPoster] = useState(null);
    const [duracion, setDuracion] = useState(''); // <-- CAMBIO 1: Añadir estado
    
    const [generos, setGeneros] = useState([]);
    
    const navigate = useNavigate();
    const { id } = useParams();

    // 1. Cargar géneros para el dropdown
    useEffect(() => {
        apiClient.get('/generos/').then(response => {
            setGeneros(response.data);
        }).catch(error => console.error(error));
    }, []);

    // 2. Si hay un 'id', cargar los datos de esa película para editar
    useEffect(() => {
        if (id) {
            apiClient.get(`/peliculas/${id}/`).then(response => {
                const p = response.data;
                setTitulo(p.titulo);
                setDirector(p.director);
                setAno(p.ano_lanzamiento);
                setGeneroId(p.genero);
                setDuracion(p.duracion || ''); // <-- CAMBIO 2: Cargar el dato
            }).catch(error => console.error(error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('director', director);
        formData.append('ano_lanzamiento', ano);
        formData.append('genero', generoId);
        formData.append('duracion', duracion); // <-- CAMBIO 3: Añadir a FormData

        if (poster) {
            formData.append('poster', poster);
        }

        try {
            const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };

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
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6">{id ? "Editar Película" : "Nueva Película"}</h1>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required 
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Director</label>
                <input type="text" value={director} onChange={e => setDirector(e.target.value)} required
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Año de Lanzamiento</label>
                <input type="number" value={ano} onChange={e => setAno(e.target.value)} required
                       className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>

            {/* --- CAMBIO 4: Añadir campo de entrada --- */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Duración (minutos)</label>
                <input 
                    type="number" 
                    value={duracion} 
                    onChange={e => setDuracion(e.target.value)}
                    placeholder="Ej: 120"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" 
                />
            </div>
            {/* --- FIN DEL CAMBIO --- */}
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Género</label>
                <select value={generoId} onChange={e => setGeneroId(e.target.value)} required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Selecciona un género</option>
                    {generos.map(g => (
                        <option key={g.id} value={g.id}>{g.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Póster</label>
                <input type="file" onChange={e => setPoster(e.target.files[0])}
                       className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>

            <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 font-medium">
                Guardar Película
            </button>
        </form>
    );
}

export default PeliculaForm;