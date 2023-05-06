import React, { useContext } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/User';

function UsersShow({ }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);

    const lengthIds = currentUser.lengths ? currentUser.lengths.map(length => length.id) : null

        return (
            <div>
            <h1 className = "centering">{currentUser.name}</h1>
            <img className = "UserCardImg" src={currentUser.photo} alt={currentUser.name} width="40%" height="40%"/>
            <p>Age: {currentUser.age}</p>
            {currentUser.lengths ? currentUser.lengths.map(length => lengthIds.indexOf(length.id) > -1 ? <Link to={`/users/${currentUser.id}/lengths/${length.id}`} key={length.id}><li>{length.distance}{' '}{length.measurement}</li></Link> : null) : null }
        </div>
    )
}

export default UsersShow;