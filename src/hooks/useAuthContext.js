import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Context must be in the Scope of Context Provider");
  }
  return context;
};
