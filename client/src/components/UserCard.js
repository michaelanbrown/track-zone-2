import React, { useContext } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import { Link, Routes, Route } from 'react-router-dom';
import UsersShow from './UsersShow';

function UserCard( { user }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

      

        return (
            <div>
                <h1>{user.name}</h1>
                <br/>
                <img className = "RunnerCardImg" src={user.photo} alt={user.name} width="40%" height="40%"/>
                <p>Age: {user.age}</p>
                {currentUser.id == user.id ? <><Link to={`${user.id}`}>View Details</Link>
                  <Routes>
                    <Route path={`users/${currentUser.id}`} element={<UsersShow/>}/>
                  </Routes></> : null}
                <br/>
                <br/>
                <br/>
            </div>
    )
}

export default UserCard;