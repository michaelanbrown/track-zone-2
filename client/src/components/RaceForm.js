import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { UserContext } from '../context/User';

function RaceForm({ races, setRaces, lengths, show, setShow }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        year: '',
        length_id: ""
    })

    const {name, year, length_id} = formData

    function onSubmit(e){
        e.preventDefault()
        const race = {
            name,
            year,
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
                        id: race.id,
                        name: race.name,
                        year: race.year,
                        duration: "TBD",
                        user: {id: race.user_id},
                        length_id: race.length_id
                    }])
                    setFormData({
                        name:'',
                        year: '',
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

    function handleLengthChange(e) {
        setFormData({
            ...formData,
            [e.target.id] : document.getElementById('length_id').value
        });
        document.getElementById('length_id').value !== "" ? setShow(true) : setShow(false)
    }

    const lengthOptions = ["", ...lengths].map(length => {
        return (<option value={length.id} key={length.id ? length.id : ""}>{length.distance}{' '}{length.measurement}</option>)
    })
    function onClick() {
        console.log('click')
    }


        return (
            <> 
            <form onSubmit={onSubmit}>
                Name: <input type='text' name='name' value={name} onChange={handleChange} />
                <br/>
                Year: <input type='text' name='year' value={year} onChange={handleChange} />
                <br/>
                Select a Length: <select id="length_id" onChange={handleLengthChange}>
                {lengthOptions}
                </select> Or {' '}
                <button type="button" onClick={onClick} disabled={show}>Create New Length</button>
                <br/>
                <input type='submit' value='Create a Race!' />
            </form>
            { errors ? <br/> : null }
            { errors ? errors.map(error => <div className='error' key={error}>{error[1]}</div>) :null }
            </>
    )
}

export default RaceForm;