import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/Config";
import { useAuthContext } from "../hooks/useAuthContext";
import { storage } from "../firebase/Config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const thumbnailRef = ref(
        storage,
        `thumbnails/${res.user.uid}/${thumbnail.name}`
      );
      await uploadBytes(thumbnailRef, thumbnail);
      const url = await getDownloadURL(thumbnailRef);
      await updateProfile(res.user, {
        displayName,
        photoURL: url,
      });
      // here below we gonna make user document
      // const collectionRef = collection(db, "users");
      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName,
        imgUrl: url,
      });
      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
      setError(null);
    } catch (error) {
      setIsPending(false);
      setError(error.message);
    }
  };
  return { signup, error, isPending };
};
