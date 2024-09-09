import React from 'react';

const GlobalControls = ({ enableAll, disableAll }) => {
  return (
    <div className="global-controls">
      <button className="enable-all" onClick={enableAll}>Activer tous les instruments</button>
      <button className="disable-all" onClick={disableAll}>Désactiver tous les instruments</button>
    </div>
  );
};

export default GlobalControls;
