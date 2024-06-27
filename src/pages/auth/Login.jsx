import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthProvider";
import logo from "../../assets/image/IAprendix_logo_transparente.png";
import bgImage from '../../assets/image/BG-IA.jpg';
import Logo from "../../components/Logo";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser, user, login } = useContext(AuthContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://nodebackend-vv0e.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error logging in user');
      }

      const responseQuery = await response.json();
      login(responseQuery.data.user); // Guardar la información del usuario en el contexto
      localStorage.setItem('jwt', responseQuery.data.token); // Guarda el JWT en el almacenamiento local
      localStorage.setItem('role', responseQuery.data.user.role); // Guarda el rol del usuario en el almacenamiento local
      setError(null);

      if (responseQuery.data.user.role.name_role === 'admin') {
        navigate("/admin/adminDashboard"); // Redirección al dashboard de admin
      } 
      else {
        navigate("/user/userDashboard"); // Redirección al dashboard de usuario
      }
    } catch (error) {
      setError(error.message);
      console.error('Error logging in user:', error);
    }
  };

  return (
    <>
      <div className="navbar bg-custom-blue text-white p-5 flex justify-between items-center">
        <div className="navbar-brand text-2xl flex items-center">
          <Logo />
        </div>
          <div className="navbar-links flex">
          <div className="navbar-item mx-5">Servicios</div>
          <div className="navbar-item mx-5">Contacto</div>
          <div className="navbar-item mx-5">
            <a href="/login" className="button-login text-blue-500">Iniciar Sesión</a>
          </div>
          </div>
      </div>
      <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', // Ajusta el tamaño del fondo a 'auto'
        backgroundPosition: 'center' // Centra la imagen en el div
      }} >
        <div className="bg-custom-blue bg-opacity-75 p-8 rounded-xl shadow-5xl w-full max-w-md">
        <img src={logo} alt="Logo del Proyecto" style={{ width: '250px' }} className="mx-auto mb-4" />
          <form className="mb-8" onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="py-3 pl-10 pr-4 bg-gray-700 bg-opacity-50 w-full outline-none rounded-lg text-white"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="relative mb-4">
              <RiLockLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="py-3 pl-10 pr-4 bg-gray-700 bg-opacity-50 w-full outline-none rounded-lg text-white"
                placeholder="Contraseña"
              />
              {showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 hover:cursor-pointer text-indigo-500"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 transform -translate-y-1/2 right-3 hover:cursor-pointer text-indigo-500"
                />
              )}
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div>
              <button
                type="submit"
                className="bg-indigo-500 text-white uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
          <span className="flex items-center justify-center gap-2 text-white">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-indigo-500 hover:text-gray-100 transition-colors">
              Regístrate
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
