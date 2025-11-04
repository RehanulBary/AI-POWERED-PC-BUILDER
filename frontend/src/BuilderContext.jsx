import React, { createContext, useState, useContext } from "react";

const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [builder, setBuilder] = useState({
    cpu: null,
    mobo: null,
    ram: null,
    ssd: null,
    gpu: null,
    psu: null,
    case: null
  });

  const addToBuilder = (type, item) => {
    setBuilder(prev => ({ ...prev, [type]: item }));
  };

  const removeFromBuilder = (type) => {
    setBuilder(prev => ({ ...prev, [type]: null }));
  };

  const clearBuilder = () => {
    setBuilder({
      cpu: null,
      mobo: null,
      ram: null,
      ssd: null,
      gpu: null,
      psu: null,
      case: null
    });
  };

  return (
    <BuilderContext.Provider value={{ builder, addToBuilder, removeFromBuilder, clearBuilder }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);
