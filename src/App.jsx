import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PeliculasList from './components/PeliculasList';
import PeliculaForm from './components/PeliculaForm';
import GenerosList from './components/GenerosList';
import GeneroForm from './components/GeneroForm';

function App() {
    return (
        <div className="min-h-screen bg-slate-100"> 
            <BrowserRouter>
                <nav className="bg-slate-800 text-white shadow-md">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-start h-16">
                          <Link 
                                    to="/" 
                                    className="text-xl font-bold mr-6"
                                >
                                    Pelis +
                          </Link>
                            <div className="flex space-x-4">
                                <Link 
                                    to="/peliculas" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                                >
                                    Películas
                                </Link>
                                <Link 
                                    to="/generos" 
                                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors"
                                >
                                    Géneros
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Routes>
                        <Route path="/peliculas" element={<PeliculasList />} />
                        <Route path="/peliculas/nueva" element={<PeliculaForm />} />
                        <Route path="/peliculas/editar/:id" element={<PeliculaForm />} />

                        <Route path="/generos" element={<GenerosList />} />
                        <Route path="/generos/nuevo" element={<GeneroForm />} />
                        <Route path="/generos/editar/:id" element={<GeneroForm />} />

                        <Route path="/" element={<PeliculasList />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;