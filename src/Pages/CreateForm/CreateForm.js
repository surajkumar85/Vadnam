import React, { useState } from "react";
import "./CreateForm.css";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

function CreateForm() {
  const [proName, setProName] = useState("");
  const [discription, setDiscription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState("");
  const { user } = useAuthContext();
  const { addData, document, isPending, error } = useFirestore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a form category");
      setTimeout(() => {
        setFormError("");
      }, 5000);
      return;
    }

    if (assignedUsers.length === 0) {
      setFormError("Please assign this project to users");
      setTimeout(() => {
        setFormError("");
      }, 5000);
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      imgUrl: user.photoURL,
      id: user.uid,
    };

    const assignedList = assignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        imgUrl: u.value.imgUrl,
        id: u.value.id,
      };
    });

    const projectData = {
      proName,
      discription,
      category: category.value,
      createdBy,
      assignedList,
      comments: [],
      dueDate: Timestamp.fromDate(new Date(date)),
      createdAt: Timestamp.now(),
    };
    await addData(projectData);
    console.log(projectData);
    if (!document) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((doc) => {
        return { value: doc, label: doc.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  return (
    <div className="projectContainer">
      {formError && <h1 className="error">{formError}</h1>}
      {error && <h1 className="error">{error}</h1>}
      <div className="projectForm">
        <h1 className="login__heading">Create a project</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__formGroup">
            <label htmlFor="date" className="login__label">
              Project Name:
            </label>
            <input
              type="text"
              id="date"
              onChange={(e) => setProName(e.target.value)}
              required
              value={proName}
              className="login__input"
            />
          </div>
          <div className="login__formGroup">
            <label htmlFor="discription" className="login__label">
              Project Discription:
            </label>
            <textarea
              id="discription"
              onChange={(e) => setDiscription(e.target.value)}
              required
              value={discription}
              className="login__input"
            />
          </div>
          <div className="login__formGroup">
            <label htmlFor="date" className="login__label">
              Date:
            </label>
            <input
              type="date"
              id="date"
              onChange={(e) => setDate(e.target.value)}
              required
              value={date}
              className="login__input"
            />
          </div>
          <div className="login__formGroup">
            <label htmlFor="date" className="login__label">
              Project Category:
            </label>
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </div>
          <div className="login__formGroup">
            <label htmlFor="date" className="login__label">
              Project Assign:
            </label>
            <Select
              options={users}
              isMulti={true}
              onChange={(option) => setAssignedUsers(option)}
            />
          </div>
          {!isPending && <button className="primary__btn">Add Project</button>}
          {isPending && (
            <button disabled className="primary__btn">
              Adding...
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateForm;
