import './App.css';
import React, { useEffect, useState, useContext } from "react"
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Welcome from './Welcome';
import Login from './Login';
import Users from './Users'
import UsersShow from './UsersShow'
import { UserContext } from '../context/User';

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [errors, setErrors] = useState([])
  const [users, setUsers] = useState([])
  const [lengths, setLengths] = useState([])
  const [races, setRaces] = useState([])

  useEffect(() => {
    fetch("/authorized_user")
    .then((res) => {
      if (res.ok) {
        res.json()
        .then((user) => {
          setCurrentUser(user);
          getUsers();
          getLengths();
          getRaces();
        });
      }
    })
  },[])

  function getUsers() {
    fetch("/users")
    .then((res) => {
      if(res.ok){
        res.json().then(setUsers)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getLengths() {
    fetch("/lengths")
    .then((res) => {
      if(res.ok){
        res.json().then(setLengths)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  function getRaces() {
    fetch("/races")
    .then((res) => {
      if(res.ok){
        res.json().then(setRaces)
      } else {
        res.json().then(json => setErrors([json.error]))
      }
    })
  }

  return (
    <main>
        <Header/>
          <Routes>
            <Route path="/" element={<Welcome/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/users/*" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<UsersShow/>} />
          </Routes>
    </main>
  );
}

export default App;