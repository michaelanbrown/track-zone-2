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
hello
            </div>
    )
}

export default RunnerShow;