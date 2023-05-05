import React, { useContext, useEffect, useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/User';

function RunnerShow({  }) {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState("")


    
        return (
            <div>
            <h1 className = "centering">{currentUser.name}</h1>
            <img className = "UserCardImg" src={currentUser.photo} alt={currentUser.name} width="40%" height="40%"/>
            <p>Age: {currentUser.age}</p>
        </div>
    )
}

export default RunnerShow;