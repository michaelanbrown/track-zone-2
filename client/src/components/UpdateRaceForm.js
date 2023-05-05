import React, { useContext, useState } from "react";
import './App.css';
import { UserContext } from '../context/User';
import { useParams } from "react-router-dom";

function UpdateRaceForm({ races, setRaces }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const { id } = useParams();
    const [errors, setErrors] = useState("")
    const [updateFormData, setUpdateFormData] = useState({
        full_name: "",
        age: "",
        photo: "",
        username: "",
        coach_id: "",
        event_id: "",
        admin: ""
    });

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
            full_name: updateFormData.full_name,
            age: updateFormData.age,
            photo: updateFormData.photo,
            username: updateFormData.username,
            coach_id: updateFormData.coach,
            event_id: updateFormData.event,
            admin: updateFormData.admin})
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
                Name: <input type="text" id="full_name" value={updateFormData.full_name} onChange={handleFormChange} placeholder="Full Name"/>
                <br/>
                Age: <input type="text" id="age" value={updateFormData.age} onChange={handleFormChange} placeholder="Age"/>
                <br/>
                Photo: <input type="text" id="photo" value={updateFormData.photo} onChange={handleFormChange} placeholder="Photo"/>
                <br/>
                Username: <input type="text" id="username" value={updateFormData.username} onChange={handleFormChange} placeholder="Username"/>
                <br/>
                <br/>
                <button className='submit'>Submit Changes</button>
                </form>
            </div>
    )
}

export default UpdateRaceForm;