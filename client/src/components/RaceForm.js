import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { UserContext } from '../context/User';

function RaceForm({ races, setRaces }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        year: '',
        user_id: "",
        length_id: ""
    })

    const {name, year, user_id, length_id} = formData

    function onSubmit(e){
        e.preventDefault()
        const race = {
            name,
            year,
            user_id,
            length_id
        }   
        fetch(`/races`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(race)
        })
        .then(res => {
            if(res.ok){
                res.json().then(race => {
                    setRaces([...races, {
                        name: race.name,
                        year: race.year,
                        duration: "TBD",
                        user_id: race.user_id,
                        length_id: race.length_id
                    }])
                    setFormData({
                        name:'',
                        year: '',
                        user_id: "",
                        length_id: ""
                    })
                    navigate(`/users/${currentUser.id}`)
                })
            } else {
                res.json().then(json => setErrors(Object.entries(json.errors)))
            }
        })  
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    }


        return (
            <> 
            <form onSubmit={onSubmit}>
                Name: <input type='text' name='name' value={name} onChange={handleChange} />
                <br/>
                Year: <input type='text' name='year' value={year} onChange={handleChange} />
                <br/>
                User: <input type='text' name='user_id' value={user_id} onChange={handleChange} />
                <br/>
                Length: <input type='text' name='length_id' value={length_id} onChange={handleChange} />
                <br/>
                <input type='submit' value='Create a Race!' />
            </form>
            { errors ? <br/> : null }
            { errors ? errors.map(error => <div className='error' key={error}>{error[1]}</div>) :null }
            </>
    )
}

export default RaceForm;