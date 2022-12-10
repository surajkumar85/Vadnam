import { useReducer } from "react";
import { db } from "../firebase/Config";
import { collection, addDoc, updateDoc, doc,deleteDoc } from "firebase/firestore";

const initialState = {
  isPending: false,
  success: null,
  document: null,
  error: null,
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADDED":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        error: action.payload,
      };
      case "UPDATE_DOC":
        return {
          ...state,
          isPending:false,
          document:action.payload,
          success:true,
          error:null
        };
      case 'DELETED':
        return {
          ...state,
          isPending:false,
          success:true,
          error:null
        }
    default:
      return state;
  }
};

export const useFirestore = () => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  const addData = async (data) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const document = await addDoc(collection(db, "projects"), data);
      dispatch({ type: "ADDED", payload: document });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
  // Deteting the projects after commpletion
  const deleteData = async (id)=>{
    dispatch({ type: "IS_PENDING" });
    try {
      await deleteDoc(doc(collection(db,'projects'),id));
      dispatch({type:'DELETED'});
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  }

  //updating
  const updateData = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updateDocument = await updateDoc(
        doc(collection(db, "projects"), id),
        updates
      );
      dispatch({ type: "UPDATE_DOC", payload: updateDocument });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return { deleteData,addData, updateData, ...state };
};
