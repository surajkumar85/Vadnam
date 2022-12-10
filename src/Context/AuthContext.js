import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/Config";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [response, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  console.log("Auth context", response.user);

  useEffect(() => {
    const sub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      sub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...response, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
