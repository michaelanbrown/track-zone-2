import React, { useContext, useState, useEffect } from "react";
import './App.css';
import { useParams } from "react-router-dom";
import { UserContext } from '../context/User';

function LengthsShow({ lengths, setLengths }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const {id} = useParams();

    useEffect(() => {
        fetch("/lengths")
        .then((res) => {
          if (res.ok) {
            res.json().then(setLengths)
          } else {
            res.json().then(json => setErrors([json.error]))
          }
        })
      },[])

    
        return (
            <div>
hello
        </div>
    )
}

export default LengthsShow;