import { useState } from "react";
import { auth } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { db } from "../firebase/Config";
import { updateDoc, doc } from "firebase/firestore";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", res.user.uid), { online: true });
      dispatch({ type: "LOGIN", payload: res.user });
      setError(null);
      setIsPending(false);
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };
  return { login, error, isPending };
};
