import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './App.css';
import { UserContext } from '../context/User';

export default function NavBar ()  {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const handleLogOut = () => {
        fetch(`/logout`, {
          method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            setCurrentUser(false)
            navigate(`/`)
          }
        })
      }

    return (
        <nav className="NavBar">
          <br/>
            <NavLink className="active" to="/">Welcome</NavLink>
            { currentUser ? null :<br />}
            { currentUser ? null : <NavLink className="active" to="/login">Login</NavLink>}
            <br></br>
            { currentUser ? <button className="bttn" onClick={handleLogOut}>Logout</button> : null }
            { currentUser ? <br /> : null}
            { currentUser ? <NavLink className="active" to="/users">Users</NavLink> : null }
            <br></br>
        </nav>
    )
}