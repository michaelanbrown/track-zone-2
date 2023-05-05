import React, { useContext } from 'react';
import './App.css';
import { UserContext } from '../context/User';

function User({ users }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);


        return (
            <div>{currentUser.name}</div>
    )
}

export default User;