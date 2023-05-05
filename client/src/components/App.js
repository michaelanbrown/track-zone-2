import './App.css';
import React, { useEffect, useContext } from "react"
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Welcome from './Welcome';
import Login from './Login';
import { UserContext } from '../context/User';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setCurrentUser(user);
        });
      }
    })
  },[])

  return (
    <main>
        <Header/>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
    </main>
  );
}

export default App;