import { useState } from "react";
import { RiUserLine, RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import bgImage from '../../assets/image/BG-IA.jpg';
import Logo from "../../components/Logo";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("https://nodebackend-vv0e.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Algo salió mal");
      }

      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.message);
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
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        backgroundPosition: 'center' // Centra la imagen en el div
      }} >
        <div className="bg-custom-blue bg-opacity-75 p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h1 className="text-2xl text-center uppercase font-bold tracking-widest text-white mb-8">
            Crear <span className="text-indigo-500">cuenta</span>
          </h1>
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>Registro exitoso</div>}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 bg-gray-700 w-full outline-none rounded-lg text-white"
                placeholder="Nombre(s)"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiUserLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 bg-gray-700 w-full outline-none rounded-lg text-white"
                placeholder="Apellidos"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiMailLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 bg-gray-700 w-full outline-none rounded-lg text-white"
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className="relative mb-4">
              <RiLockLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 bg-gray-700 w-full outline-none rounded-lg text-white"
                placeholder="Contraseña"
                required
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
            <div className="relative mb-8">
              <RiLockLine className="absolute top-1/2 transform -translate-y-1/2 left-3 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="py-3 pl-10 pr-4 bg-gray-700 w-full outline-none rounded-lg text-white"
                placeholder="Confirmar contraseña"
                required
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
            <div>
              <button
                type="submit"
                className="bg-indigo-500 text-white uppercase font-bold text-sm w-full py-3 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Registrarme
              </button>
            </div>
          </form>
          <span className="flex items-center justify-center gap-2 text-white">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-indigo-500 hover:text-gray-100 transition-colors">
              Ingresa
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
