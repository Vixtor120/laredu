import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl mr-1">📚</span>
                            <span className="text-xl font-bold text-indigo-700">Laredu</span>
                        </Link>
                        <div className="hidden md:ml-6 md:flex md:space-x-2">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Inicio
                            </Link>
                            <Link
                                to="/courses"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/courses') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Cursos
                            </Link>
                            <Link
                                to="/subjects"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/subjects') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Asignaturas
                            </Link>
                            <Link
                                to="/assignments"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/assignments') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Tareas
                            </Link>
                            <Link
                                to="/submissions"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/submissions') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Entregas
                            </Link>
                            <Link
                                to="/messages"
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    isActive('/messages') 
                                        ? 'text-indigo-700 bg-indigo-100' 
                                        : 'text-gray-500 hover:text-indigo-700 hover:bg-gray-100'
                                }`}
                            >
                                Mensajes
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <LogoutButton onLogout={onLogout} />
                    </div>
                </div>
            </div>
        </nav>
    );
}