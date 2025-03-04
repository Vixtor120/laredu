import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom"; 
import { useState, useEffect } from "react"; 
import Login from "./components/Login"; 
import Register from "./components/Register"; 
import Navbar from "./components/Navbar"; 
import Dashboard from "./components/Dashboard"; 
import CoursesList from "./components/CoursesList"; 
import SubjectsList from "./components/SubjectsList"; 
import AssignmentsList from "./components/AssignmentsList"; 
import SubmissionsList from "./components/SubmissionsList"; 
import MessageList from "./components/MessageList"; 

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  
  useEffect(() => { 
    setToken(localStorage.getItem("token")); 
  }, []);
  
  const handleLoginSuccess = (receivedToken: string) => { 
    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };
  
  const handleLogout = () => { 
    localStorage.removeItem("token");
    setToken(null);
  };
  
  return ( 
    <Router>
      <div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col"
        style={{ 
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          backgroundBlendMode: "overlay"
        }}
      >
        {!token ? (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h1 className="text-4xl font-bold text-indigo-700">Laredu</h1>
                <p className="text-gray-600">Plataforma Educativa</p>
              </div>
              
              <Routes>
                <Route path="/" element={
                  <>
                    <Login onLoginSuccess={handleLoginSuccess} />
                    <p className="mt-4 text-center">
                      ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Registrarse</Link>
                    </p>
                  </>
                } />
                <Route path="/register" element={
                  <>
                    <Register />
                    <p className="mt-4 text-center">
                      ¿Ya tienes cuenta? <Link to="/" className="text-blue-600 hover:underline">Iniciar sesión</Link>
                    </p>
                  </>
                } />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <>
            <Navbar onLogout={handleLogout} />
            <div className="flex-grow p-6 flex justify-center">
              <div className="w-full max-w-7xl">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/courses" element={<CoursesList />} />
                  <Route path="/subjects" element={<SubjectsList />} />
                  <Route path="/assignments" element={<AssignmentsList />} />
                  <Route path="/submissions" element={<SubmissionsList />} />
                  <Route path="/messages" element={<MessageList />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </div>
            </div>
            <footer className="bg-white bg-opacity-80 p-4 text-center text-gray-600 text-sm border-t border-gray-200">
              © {new Date().getFullYear()} Laredu - Plataforma Educativa
            </footer>
          </>
        )}
      </div>
    </Router>
  );
}