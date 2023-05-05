import React, { useContext } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import UserCard from './UserCard';

function User({ users }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const userRender = users.map (user => {
        return (
            <UserCard user={user} key={user.id}/>
        )
    })

        return (
            <div>{ users ? userRender : null }</div>
    )
}

export default User;