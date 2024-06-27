import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white p-4">
      <h1 className="text-6xl font-bold mb-8">404</h1>
      <p className="text-2xl mb-8">Página no encontrada</p>
      <Link to="/" className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition-colors">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Error404;