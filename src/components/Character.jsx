// src/components/Character.jsx
import React from 'react';
import '../scss/Character.scss';

const Character = ({ imageSrc, isActive, onClick }) => {
  return (
    <div
      className={`character ${isActive ? 'active' : 'inactive'}`}
      onClick={onClick}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {/* Le contenu visuel de l'image est géré via le background */}
    </div>
  );
};

export default Character;
