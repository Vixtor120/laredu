import { Link } from "react-router-dom"; 

export default function Dashboard() {
  return ( 
    <div className="p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Bienvenido a Laredu</h1>
        <p className="text-gray-600">Selecciona una sección para comenzar</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/courses" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 group">
          <div className="h-3 bg-blue-500"></div>
          <div className="p-6 flex items-start">
            <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Cursos</h2>
              <p className="text-gray-600">Gestiona tus cursos disponibles</p>
            </div>
          </div>
        </Link>
        
        <Link to="/subjects" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 group">
          <div className="h-3 bg-green-500"></div>
          <div className="p-6 flex items-start">
            <div className="bg-green-100 p-3 rounded-full mr-4 group-hover:bg-green-200 transition-colors">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Asignaturas</h2>
              <p className="text-gray-600">Explora todas tus asignaturas</p>
            </div>
          </div>
        </Link>
        
        <Link to="/assignments" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 group">
          <div className="h-3 bg-purple-500"></div>
          <div className="p-6 flex items-start">
            <div className="bg-purple-100 p-3 rounded-full mr-4 group-hover:bg-purple-200 transition-colors">
              <span className="text-2xl">📝</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Tareas</h2>
              <p className="text-gray-600">Revisa tus tareas pendientes</p>
            </div>
          </div>
        </Link>
        
        <Link to="/submissions" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 group">
          <div className="h-3 bg-yellow-500"></div>
          <div className="p-6 flex items-start">
            <div className="bg-yellow-100 p-3 rounded-full mr-4 group-hover:bg-yellow-200 transition-colors">
              <span className="text-2xl">📤</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Entregas</h2>
              <p className="text-gray-600">Gestiona tus entregas de tareas</p>
            </div>
          </div>
        </Link>
        
        <Link to="/messages" className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1 group">
          <div className="h-3 bg-red-500"></div>
          <div className="p-6 flex items-start">
            <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-200 transition-colors">
              <span className="text-2xl">💬</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">Mensajes</h2>
              <p className="text-gray-600">Chatea con profesores y estudiantes</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
