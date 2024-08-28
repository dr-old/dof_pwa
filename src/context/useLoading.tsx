import React, { createContext, useState, useContext } from "react";

// Define the shape of the context
interface LoadingContextProps {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

// Create the context
const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

// Create a custom hook to use the Loading context
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

// Create the provider component
export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
