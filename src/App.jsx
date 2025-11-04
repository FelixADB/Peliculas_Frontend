import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PeliculasList from './components/PeliculasList';
import PeliculaForm from './components/PeliculaForm';
import GenerosList from './components/GenerosList';
import GeneroForm from './components/GeneroForm';

function App() {
    return (
        <BrowserRouter>
            <nav className="bg-gray-800 text-white p-4">
                <Link to="/peliculas" className="mr-4 hover:text-gray-300">Películas</Link>
                <Link to="/generos" className="mr-4 hover:text-gray-300">Géneros</Link>
            </nav>

            <div className="container mx-auto p-4">
                <Routes>
                    {/* Rutas para Películas */}
                    <Route path="/peliculas" element={<PeliculasList />} />
                    <Route path="/peliculas/nueva" element={<PeliculaForm />} />
                    <Route path="/peliculas/editar/:id" element={<PeliculaForm />} />

                    {/* Rutas para Géneros */}
                    <Route path="/generos" element={<GenerosList />} />
                    <Route path="/generos/nuevo" element={<GeneroForm />} />
                    <Route path="/generos/editar/:id" element={<GeneroForm />} />

                    <Route path="/" element={<PeliculasList />} /> {/* Ruta por defecto */}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;