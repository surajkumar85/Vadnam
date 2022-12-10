import { useEffect, useState } from "react";
import { db } from "../firebase/Config";
import { collection, doc, onSnapshot } from "firebase/firestore";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const ref = doc(collectionRef, id);

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError("No document exist!!!");
        }
      },
      (err) => {
        console.log(err.message);
        setError(err.message);
      }
    );

    return () => unsub();
  }, [collectionName, id]);

  return { document, error };
};
