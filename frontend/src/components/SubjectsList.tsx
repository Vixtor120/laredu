import { useEffect, useState } from "react"; 

interface Subject { 
  id: number; 
  name: string; 
  course_id: number; 
  teacher_id: number; 
} 

export default function SubjectsList() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    fetch("http://127.0.0.1:8000/api/subjects", {
      headers: { 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las asignaturas");
        }
        return res.json();
      })
      .then((data) => {
        setSubjects(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return ( 
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Asignaturas</h2>
        <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full text-sm font-medium">
          Total: {subjects.length}
        </span>
      </div>
      
      {subjects.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-green-100 rounded-full h-12 w-12 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No hay asignaturas disponibles actualmente.</p>
          <p className="text-gray-500 text-sm mt-1">Las asignaturas aparecerán aquí cuando estén disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <div key={subject.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{subject.name}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Curso ID: {subject.course_id}</span>
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Profesor ID: {subject.teacher_id}</span>
              </div>
              <div className="flex justify-end">
                <button className="text-green-600 text-sm hover:underline">Ver detalles</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
