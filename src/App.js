import "./App.css";
import Navbar from "./Components/navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Project from "./Pages/Project/Project";
import NotFound from "./Pages/404/404";
import CreateForm from "./Pages/CreateForm/CreateForm";
import Sidebar from "./Components/sidebar/Sidebar";
import OnlineUsers from "./Components/OnlineUsers/OnlineUsers";
import { useAuthContext } from "./hooks/useAuthContext";
import AboutModel from "./Components/AboutModel/AboutModel";
import { useState } from "react";

function App() {
  const { user, authIsReady } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (e) => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="app">
      {authIsReady && (
        <>
          {user && <Sidebar />}
          <div className="app__main">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route
                path="/create"
                element={user ? <CreateForm /> : <Navigate to="/login" />}
              />
              <Route
                path="/projects/:id"
                element={user ? <Project /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </>
      )}
      <button className="help__btn" onClick={handleClick}>
        ?
      </button>
      {isVisible && <AboutModel handleClick={handleClick} />}
    </div>
  );
}

export default App;
