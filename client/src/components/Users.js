import React, { useContext, useState } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import UserCard from './UserCard';

function User({ users }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [search, setSearch] = useState('')

    function handleChange(e) {
        setSearch(e.target.value);
    }

    const userRender = users.map (user => {
        return (
            <UserCard user={user} key={user.id}/>
        )
    })

        return (
            <div>
                <br/>
                <form>
                    Search: <input type='text' name='search' placeholder='Search Here' value={search} onChange={handleChange} />
                    {" "}
                    <button>🔍</button>
                </form>
                { users ? userRender : null }
            </div>
    )
}

export default User;