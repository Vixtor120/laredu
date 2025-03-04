import { useEffect, useState } from "react"; 

interface Assignment { 
  id: number; 
  title: string; 
  due_date: string; 
  subject_id: number; 
} 

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    fetch("http://127.0.0.1:8000/api/assignments", {
      headers: { 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener las tareas");
        }
        return res.json();
      })
      .then((data) => {
        setAssignments(data);
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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

  // Function to calculate days remaining
  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to get status color based on days remaining
  const getStatusColor = (daysRemaining: number) => {
    if (daysRemaining < 0) return "bg-red-100 text-red-800"; // Late
    if (daysRemaining <= 2) return "bg-yellow-100 text-yellow-800"; // Due soon
    return "bg-green-100 text-green-800"; // Plenty of time
  };

  return ( 
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Tareas</h2>
        <span className="bg-purple-100 text-purple-800 py-1 px-3 rounded-full text-sm font-medium">
          Total: {assignments.length}
        </span>
      </div>
      
      {assignments.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-purple-100 rounded-full h-12 w-12 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-600">No hay tareas asignadas actualmente.</p>
          <p className="text-gray-500 text-sm mt-1">Las tareas pendientes aparecerán aquí.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => {
            const daysRemaining = getDaysRemaining(assignment.due_date);
            const statusColor = getStatusColor(daysRemaining);
            
            return (
              <div key={assignment.id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">Asignatura ID: {assignment.subject_id}</p>
                  </div>
                  <span className={`${statusColor} px-3 py-1 rounded-full text-xs font-medium`}>
                    {daysRemaining < 0 
                      ? `${Math.abs(daysRemaining)} día(s) de retraso` 
                      : daysRemaining === 0 
                        ? "Entrega hoy" 
                        : `${daysRemaining} día(s) restante(s)`}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm">
                  <div className="text-gray-500">
                    Fecha límite: {new Date(assignment.due_date).toLocaleDateString()}
                  </div>
                  <button className="text-purple-600 hover:underline">Ver detalles</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
