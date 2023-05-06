import React, { useContext, useState, useEffect } from "react";
import './App.css';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function UpdateRaceForm({ races, setRaces }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState("")
    const [race, setRace] = useState({})
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        year: "",
        duration: "",
        length: ""
    });

    useEffect(() => {
        fetch(`/races/${id}`)
        .then((res) => {
            if (res.ok) {
              res.json()
              .then(race => {
                setRace(race)
                setUpdateFormData({...updateFormData,
                name: race.name,
                year: race.year,
                duration: race.duration,
                length: race.length})})
            } else {
                res.json().then(json => setErrors([json.error]))
            }
          })
        },[])

    function handleFormChange(e) {
        setUpdateFormData({
            ...updateFormData,
            [e.target.id] : e.target.value
        });
    }

    function updateRaces(updatedRace) {
        const updatingRace = races.map((race) => {
            if (race.id === updatedRace.id) {
                setCurrentUser(currentUser)
                return updatedRace
            } else {
                return race
            }
        })
        setRaces(updatingRace)
        setUpdateFormData({...updateFormData,
            name: updateFormData.name,
            year: updateFormData.year,
            duration: updateFormData.duration,
            length: updateFormData.length})
    }

    function handleChange(e) {
        e.preventDefault();
        fetch(`${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            },
            body: JSON.stringify(updateFormData)
        }).then((res) => {
            if(res.ok){
              res.json()
              .then(race => {
                updateRaces(race)
                navigate(`/users/${currentUser.id}/lengths/${race.length.id}`)})
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function deleteRace(deletedRace) {
        const deletingRace = races.map((race) => {
            if (race.id !== deletedRace.id) {
                setCurrentUser(currentUser)
                return deletedRace
            } else {
                return race
            }
        })
        setRaces(deletingRace)
        setUpdateFormData({...updateFormData,
            name: updateFormData.name,
            year: updateFormData.year,
            duration: updateFormData.duration})
    }


    function handleRaceDelete() {
        fetch(`${id}`, {
            method:"DELETE"
        })
        .then(res =>{
          if(res.ok){
            deleteRace(race)
            const currentRaces = currentUser.races.filter(currRace => {
                if (currRace.id !== race.id) {
                    return currRace
                }
            })
            setCurrentUser({
                'id': currentUser.id,
                'age': currentUser.age,
                'email': currentUser.email,
                'name': currentUser.name,
                'photo': currentUser.photo,
                'races': currentRaces,
                'username': currentUser.username,
                'lengths': currentUser.lengths
            })
            navigate(`/users/${currentUser.id}`)
          }
        })
    }
      
    return (
        <div>
            <form onSubmit={handleChange}>
            <h1>Enter your changes:</h1>
            Race Name: <input type="text" id="name" value={updateFormData.name} onChange={handleFormChange}/>
            <br/>
            Year: <input type="text" id="year" value={updateFormData.year} onChange={handleFormChange}/>
            <br/>
            Duration: <input type="text" id="duration" value={updateFormData.duration} onChange={handleFormChange} placeholder="Format: 00:00:00"/>
            <br/>
            <br/>
            <button className='submit'>Submit Changes</button>
            </form>
            <br/>
            Or
            <br/>
            <br/>
            <button onClick={handleRaceDelete}>Delete 🗑️</button>
            {errors ? <br/> : null}
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        </div>
    )
}

export default UpdateRaceForm;