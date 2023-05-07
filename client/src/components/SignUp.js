import React, { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import './App.css';
import { UserContext } from '../context/User';

function Signup({ users, setUsers, getUsers }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        username: '',
        email:'',
        password:'',
        age: '',
        photo: ''
    })

    const {name, username, email, password, age, photo} = formData
    const navigate = useNavigate();

    function onSubmit(e){
        e.preventDefault()
        const user = {
            name,
            username,
            email,
            password,
            age,
            photo
        }   
        fetch(`/users`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    setCurrentUser(user)
                    getUsers()
                    setUsers([...users, user])
                    navigate(`/users/${user.id}`)
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

    return (
        <> 
        <form onSubmit={onSubmit}>
            Username: <input type='text' name='username' value={username} onChange={handleChange} />
            <br/>
            Email: <input type='text' name='email' value={email} onChange={handleChange} />
            <br/>
            Password: <input type='password' name='password' value={password} onChange={handleChange} />
            <br/>
            <br/>
            <br/>
            <br/>
            Tell us more about yourself!
            <br/>
            <br/>
            Full Name: <input type='text' name='name' value={name} onChange={handleChange} />
            <br/>
            Age: <input type='text' name='age' value={age} onChange={handleChange} />
            <br/>
            Photo Link: <input type='text' name='photo' value={photo} onChange={handleChange} />
            <br/>
            <input type='submit' value='Sign up!' />
        </form>
        { errors ? <br/> : null }
        { errors ? errors.map(error => <div className='error' key={error}>{error}</div>) :null }
        </>
    )
}

export default Signup;