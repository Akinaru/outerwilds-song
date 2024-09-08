// src/components/Character.jsx
import React from 'react';
import '../scss/Character.scss';


const Character = ({ imageSrc, isActive, onClick }) => {
  return (
    <div
      className={`character ${isActive ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      <img src={imageSrc} alt="Instrument" />
    </div>
  );
};

export default Character;
