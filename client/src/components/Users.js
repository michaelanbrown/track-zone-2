import React, { useContext, useState } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import UserCard from './UserCard';

function User({ users }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [search, setSearch] = useState('')
    const [userSearch, setUserSearch] = useState([])
    const [errors, setErrors] = useState(false)

    function handleChange(e) {
        setSearch(e.target.value);
    }

    function getUserSearch(e) {
        e.preventDefault();
        fetch(`/user_search/${search}`)
        .then((res) => {
          if(res.ok){
            res.json().then(setUserSearch)
          } else {
            res.json().then(json => setErrors([json.error]))
          }
        })
      }

      console.log(userSearch)

    const userRender = users.map (user => {
        return (
            <UserCard user={user} key={user.id}/>
        )
    })

        return (
            <div>
                <br/>
                <form onSubmit={getUserSearch}>
                    Search: <input type='text' name='search' placeholder='Search Here' value={search} onChange={handleChange} />
                    {" "}
                    <button>🔍</button>
                </form>
                { users ? userRender : null }
            </div>
    )
}

export default User;