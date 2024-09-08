import React from 'react';

const GlobalControls = ({ enableAll, disableAll }) => {
  return (
    <div className="global-controls">
      <button className="enable-all" onClick={enableAll}>Enable All</button>
      <button className="disable-all" onClick={disableAll}>Disable All</button>
    </div>
  );
};

export default GlobalControls;
