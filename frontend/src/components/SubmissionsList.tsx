import React, { useEffect, useState } from "react"; 

interface Submission { 
  id: number; 
  assignment_id: number; 
  user_id: number; 
  submitted_at: string; 
  grade: number | null; 
} 

export default function SubmissionsList() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [assignmentId, setAssignmentId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { 
    fetchSubmissions();
  }, []);

  const fetchSubmissions = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/submissions", {
      headers: { 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener entregas");
        }
        return res.json();
      })
      .then((data) => {
        setSubmissions(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    if (!assignmentId.trim()) {
      setError("Por favor, introduce un ID de tarea válido");
      setIsSubmitting(false);
      return;
    }
    
    fetch("http://127.0.0.1:8000/api/submissions", {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        user_id: 2, // This should be dynamically generated from authenticated user
        assignment_id: parseInt(assignmentId),
        submitted_at: new Date().toISOString(),
        grade: null, 
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al entregar la tarea");
        }
        return res.json();
      })
      .then(() => {
        setMessage("¡Tarea entregada con éxito!");
        setAssignmentId("");
        // Refresh the submissions list
        fetchSubmissions();
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return ( 
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Mis Entregas</h2>
        <span className="bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full text-sm font-medium">
          Total: {submissions.length}
        </span>
      </div>

      {/* Success message */}
      {message && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-700">{message}</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submission form */}
      <div className="bg-yellow-50 p-5 rounded-lg mb-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Entregar nueva tarea</h3>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <label htmlFor="assignment-id" className="block text-sm font-medium text-gray-700 mb-1">
              ID de la Tarea
            </label>
            <input
              id="assignment-id"
              type="number"
              placeholder="Ej: 1"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              value={assignmentId}
              onChange={(e) => setAssignmentId(e.target.value)}
              disabled={isSubmitting}
              min="1"
              required
            />
          </div>
          <div className="self-end">
            <button 
              type="submit" 
              className={`bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors flex items-center justify-center ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </>
              ) : 'Entregar Tarea'}
            </button>
          </div>
        </form>
      </div>

      {/* Submissions list */}
      {submissions.length === 0 ? (
        <div className="text-center py-8">
          <div className="mx-auto bg-yellow-100 rounded-full h-12 w-12 flex items-center justify-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-gray-600">No has entregado ninguna tarea todavía.</p>
          <p className="text-gray-500 text-sm mt-1">Tus entregas aparecerán aquí cuando las realices.</p>
        </div>
      ) : (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Historial de entregas</h3>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarea ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Entrega</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calificación</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{submission.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded">
                        Tarea #{submission.assignment_id}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(submission.submitted_at).toLocaleDateString()} {new Date(submission.submitted_at).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {submission.grade !== null ? (
                        <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded">
                          {submission.grade}
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded">
                          Sin calificar
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
