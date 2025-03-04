import React, { useEffect, useState } from "react"; 

interface Message { 
  id: number; 
  sender_id: number; 
  receiver_id: number; 
  content: string; 
  is_read: boolean; 
  created_at: string; 
} 

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  
  // For simplicity, assume current user's ID is 2
  // In a real app, this would come from authentication context
  const currentUserId = 2;

  useEffect(() => { 
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setIsLoading(true);
    fetch("http://127.0.0.1:8000/api/messages", {
      headers: { 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener mensajes");
        }
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const handleSendMessage = (e: React.FormEvent) => { 
    e.preventDefault();
    
    if (!receiverId.trim() || !content.trim()) {
      setError("Por favor, introduce un destinatario y un mensaje");
      return;
    }
    
    setIsSending(true);
    setStatusMessage("");
    setError("");
    
    fetch("http://127.0.0.1:8000/api/messages", {
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        receiver_id: parseInt(receiverId),
        content, 
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al enviar mensaje");
        }
        return res.json();
      })
      .then(() => {
        setStatusMessage("Mensaje enviado con éxito");
        setContent("");
        fetchMessages(); // Refresh messages after sending
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  // Function to format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    // If today, just show time
    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If yesterday, show "Yesterday" and time
    if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date and time
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return ( 
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mensajería</h2>
          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full text-sm font-medium">
            Total: {messages.length}
          </span>
        </div>
        
        {/* Success message */}
        {statusMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700">{statusMessage}</p>
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
        
        {/* Message form */}
        <div className="bg-red-50 p-5 rounded-lg mb-6 border border-red-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Enviar nuevo mensaje</h3>
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label htmlFor="receiver-id" className="block text-sm font-medium text-gray-700 mb-1">
                ID del Destinatario
              </label>
              <input
                id="receiver-id"
                type="number"
                placeholder="Ej: 3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={receiverId}
                onChange={(e) => setReceiverId(e.target.value)}
                disabled={isSending}
                min="1"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message-content" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                id="message-content"
                placeholder="Escribe tu mensaje aquí..."
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isSending}
                rows={3}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <button 
                type="submit" 
                className={`bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center ${
                  isSending ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Enviar Mensaje
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Messages list */}
      <div className="bg-gray-50 h-[500px] overflow-y-auto p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 sticky top-0 bg-gray-50 py-2">Conversaciones</h3>
        
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="mx-auto bg-red-100 rounded-full h-12 w-12 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-600">No hay mensajes disponibles.</p>
            <p className="text-gray-500 text-sm mt-1">Tus mensajes aparecerán aquí.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => {
              const isFromMe = msg.sender_id === currentUserId;
              
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${isFromMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[70%] rounded-lg p-4 ${
                      isFromMe 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-semibold ${isFromMe ? 'text-white' : 'text-gray-800'}`}>
                        {isFromMe ? 'Yo' : `Usuario ${msg.sender_id}`}
                      </span>
                      {!msg.is_read && !isFromMe && (
                        <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Nuevo
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${isFromMe ? 'text-white' : 'text-gray-800'}`}>{msg.content}</p>
                    <div className={`text-xs mt-1 text-right ${isFromMe ? 'text-blue-200' : 'text-gray-500'}`}>
                      {formatDate(msg.created_at)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
