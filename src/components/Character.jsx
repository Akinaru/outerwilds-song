// src/components/Character.jsx
import React from 'react';
import '../scss/Character.scss';

const Character = ({ imageSrc, isActive, onClick }) => {
  return (
    <div
      className={`character ${isActive ? 'active' : 'inactive'}`}
      onClick={onClick}
    >
      <div
        className="character-image"
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>
    </div>
  );
};

export default Character;
