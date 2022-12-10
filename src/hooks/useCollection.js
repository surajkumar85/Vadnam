import {
  collection,
  where,
  orderBy,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { db } from "../firebase/Config";

export const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collectionName);
    if (queryRef) {
      ref = query(ref, where(...queryRef));
    }
    if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef));
    }
    const unSub = onSnapshot(ref, (doc) => {
      const results = [];
      doc.docs.forEach((_doc) => {
        results.push({ ..._doc.data(), id: _doc.id });
      });
      setError(null);
      setDocuments(results);
    });

    return () => unSub();
  }, [collectionName, orderByRef, queryRef]);
  return { documents, error };
};
