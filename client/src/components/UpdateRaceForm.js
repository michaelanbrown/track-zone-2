import React, { useContext, useState, useEffect } from "react";
import './App.css';
import { UserContext } from '../context/User';
import { useParams } from "react-router-dom";

function UpdateRaceForm({ races, setRaces }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { id } = useParams();
    const [errors, setErrors] = useState("")
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        year: "",
        duration: ""
    });

    useEffect(() => {
        fetch(`races/${id}`)
        .then((res) => {
            if (res.ok) {
              res.json()
              .then(race => {
                setUpdateFormData({...updateFormData,
                name: race.name,
                year: race.year,
                duration: race.duration})})
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
            duration: updateFormData.duration})
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
                updateRaces(race)})
            } else {
              res.json().then(json => setErrors(json.errors))
            }
    })}

        return (
            <div>
                { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
                { errors ? <br/> : null }
                <form onSubmit={handleChange}>
                Enter your changes:
                <br/>
                Race Name: <input type="text" id="name" value={updateFormData.name} onChange={handleFormChange}/>
                <br/>
                Year: <input type="text" id="year" value={updateFormData.year} onChange={handleFormChange}/>
                <br/>
                Duration: <input type="text" id="duration" value={updateFormData.duration} onChange={handleFormChange} placeholder="Format: 0000:00:00"/>
                <br/>
                <br/>
                <button className='submit'>Submit Changes</button>
                </form>
            </div>
    )
}

export default UpdateRaceForm;