import React, { useContext, useEffect, useState } from "react";
import './App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/User';

function LengthsShow({  }) {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState("")

    
        return (
            <div>
hello
        </div>
    )
}

export default LengthsShow;