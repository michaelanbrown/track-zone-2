import './App.css';
import React, { useEffect, useState, useContext } from "react"
import { Routes, Route } from "react-router-dom";
import Header from './Header';
import Welcome from './Welcome';
import Signup from './SignUp';
import Login from './Login';
import Users from './Users';
import UsersShow from './UsersShow';
import LengthsShow from './LengthsShow';
import { UserContext } from '../context/User';
import RaceForm from './RaceForm';
import UpdateRaceForm from './UpdateRaceForm';
import LengthForm from './LengthForm';

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
            <Route path="/signup" element={<Signup users={users} setUsers={setUsers} getUsers={getUsers} getRaces={getRaces} getLengths={getLengths}/>} />
            <Route path="/login" element={<Login setUsers={setUsers} getUsers={getUsers} getRaces={getRaces} getLengths={getLengths}/>} />
            <Route path="/users/*" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<UsersShow lengths={lengths}/>} />
            <Route path="/users/:id/lengths/:id/*" element={<LengthsShow lengths={lengths} races={races}/>} />
            <Route path="/new_race/*" element={<RaceForm races={races} setRaces={setRaces} lengths={lengths} setLengths={setLengths}/>}/> 
            <Route path="/new_length" element={<LengthForm lengths={lengths} setLengths={setLengths}/>}/>
            <Route path="/races/:id" element={<UpdateRaceForm races={races} setRaces={setRaces} />}/>
          </Routes>
    </main>
  );
}

export default App;