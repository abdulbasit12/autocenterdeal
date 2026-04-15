"use client";
import React, { createContext, useState, useCallback } from "react";

export const ContextAPI = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({});

  const updateState = useCallback((updater) => {
    if (typeof updater === "function") {
      setState(updater);
    } else {
      setState((prevState) => ({ ...prevState, ...updater }));
    }
  }, []);

  const value = { state, updateState };

  return <ContextAPI.Provider value={value}>{children}</ContextAPI.Provider>;
};
