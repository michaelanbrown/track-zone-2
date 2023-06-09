import React, { useContext, useState } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import { useNavigate } from 'react-router-dom';

function LengthForm({ lengths, setLengths }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        distance: '',
        measurement: ''
    })

    const {distance, measurement} = formData

    function onSubmit(e){
        e.preventDefault()
        const length = {
            distance,
            measurement
        }   
        fetch(`/lengths`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(length)
        })
        .then(res => {
            if(res.ok){
                res.json().then(length => {
                    setLengths([...lengths, length])
                    setFormData({
                        distance:'',
                        measurement: ''
                    })
                    navigate(`/new_race`)
                })
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        })  
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }

    const measurements = ["", "km", "mi", "m"]

    const measurementOptions = measurements.map(measurement => {
        return (<option value={measurement} key={measurement}>{measurement}</option>)
    })

    function handleMeaurementChange(e) {
        setFormData({
            ...formData,
            [e.target.id] : document.getElementById('measurement').value
        });
    }

    const errorMap = errors.map(error => <div key={error} className="error">{error}</div>)

  return (
    <div>
        <h1>Create a Length!</h1>
        <form onSubmit={onSubmit}>
            Distance: <input type='text' name='distance' value={distance} onChange={handleChange} />
            <br/>
            Measurement: <select id="measurement" onChange={handleMeaurementChange}>
            {measurementOptions}
            </select>
            <br/>
            <input type='submit' value='Create a Length!' />
        </form>
        <br/>
        {errors ? errorMap : null}
    </div>
  );
}

export default LengthForm;