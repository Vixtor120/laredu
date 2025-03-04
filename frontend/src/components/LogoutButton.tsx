interface LogoutProps { 
  onLogout: () => void; 
} 

export default function LogoutButton({ onLogout }: LogoutProps) {
  return ( 
    <button
      onClick={onLogout}
      className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded-md hover:bg-red-50 transition-colors duration-200 flex items-center group shadow-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span className="font-medium">Cerrar Sesión</span>
    </button>
  );
}
