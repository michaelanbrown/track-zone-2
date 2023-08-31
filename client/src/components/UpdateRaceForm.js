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
    const [length, setLength] = useState({})
    const [updateFormData, setUpdateFormData] = useState({
        name: "",
        year: "",
        duration: ""
    });

    useEffect(() => {
        fetch(`/races/${id}`)
        .then((res) => {
            if (res.ok) {
              res.json()
              .then(race => {
                setRace(race)
                setLength(race.length)
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
                updateRaces(race)
                navigate(`/users/${currentUser.id}/lengths/${race.length.id}`)})
            } else {
              res.json().then(json => setErrors([json.errors]))
            }
    })}

    function deleteRace(deletedRace) {
        const deletingRace = races.filter((race) => {
            if (race.id !== deletedRace.id) {
                return deletedRace
            }
        })
        setRaces(deletingRace)
        setUpdateFormData({...updateFormData,
            name: updateFormData.name,
            year: updateFormData.year,
            duration: updateFormData.duration})
    }
    // function lengthRender() {
    //     let checkedLengths = []
    //     const renderedLengths = currentUser.lengths.map(leng => {
    //         if (leng.id !== length.id) {
    //             checkedLengths.push(leng)
    //             console.log(checkedLengths)
    //             return leng
    //         } if (leng.id == length.id && checkedLengths.indexOf(leng) <= -1) {
    //             checkedLengths.push(leng)
    //             console.log(checkedLengths)
    //             return null
    //         } if (leng.id == length.id && checkedLengths.indexOf(leng) >= 0) {
    //             console.log(checkedLengths)
    //             return leng
    //         }
    //     })
    //     console.log(renderedLengths)
    // }

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
            let lengthHolder = []
            const currentLengths = currentUser.lengths.filter(currLength => {
                if (currLength.id !== length.id) {
                    lengthHolder.push(currLength.id)
                    return currLength
                } else if (currLength.id == length.id && lengthHolder.indexOf(currLength.id) < 0) {
                    lengthHolder.push(currLength.id)
                } else {
                    return currLength
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
                'lengths': currentLengths
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
            Duration (format 00:00:00): <input type="text" id="duration" value={updateFormData.duration} onChange={handleFormChange} placeholder="Format: 00:00:00"/>
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
            { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) : null }
        </div>
    )
}

export default UpdateRaceForm;