import { useEffect, useState } from "react"; 

interface Course { 
  id: number; 
  name: string; 
  description: string; 
} 

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setIsLoading(false);
      return; 
    } 

    fetch("http://127.0.0.1:8000/api/courses", {
      headers: { 
        Authorization: "Bearer " + token, 
      },
    })
    .then((res) => { 
      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      } 
      return res.json();
    })
    .then((data: Course[]) => { 
      setCourses(data);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        <h2 className="text-2xl font-bold text-gray-800">Mis Cursos</h2>
        <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm font-medium">
          Total: {courses.length}
        </span>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">No hay cursos disponibles actualmente.</p>
          <p className="text-gray-500 text-sm mt-1">Los cursos aparecerán aquí cuando estén disponibles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <span className="text-xl">📘</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{course.name}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                  <div className="mt-3 flex items-center">
                    <span className="text-xs text-gray-500 mr-2">ID: {course.id}</span>
                    <button className="text-blue-600 text-sm hover:underline">Ver detalles</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
