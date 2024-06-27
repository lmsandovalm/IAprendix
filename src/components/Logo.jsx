import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoImage from '../assets/image/IAprendix_logo_transparente.png'; // Ajusta el path según tu estructura de proyecto

const Logo = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('adminDashboard');
  };

  return (
    <img
      className="inline-block mr-1 w-60 h-20"
      src={logoImage}
      alt="Logo"
      onClick={handleLogoClick}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default Logo;
