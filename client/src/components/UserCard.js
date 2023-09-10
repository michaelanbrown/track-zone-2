import React, { useContext, useState } from 'react';
import './App.css';
import { UserContext } from '../context/User';
import { Link, Routes, Route } from 'react-router-dom';
import UsersShow from './UsersShow';

function UserCard( { user }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const userLastThreeRaces = user.races.slice(-3)
    const currentUserLastThreeRaces = currentUser.races.slice(-3)
    const [liked, setLiked] = useState(user.likes.indexOf(currentUser.username) > -1)
    const [likesArray, setLikesArray] = useState(user.likes)
    const [errors, setErrors] = useState([])

    function handleLikeButton(e) {
      e.preventDefault();
      if(liked) {
        fetch(`${user.id}`, {
          method: "PATCH",
          headers: {
              "Content-Type" : "application/json",
              "Accept" : "application/json"
          },
          body: JSON.stringify(likesArray.filter((liker) => liker !== currentUser.username))
          }).then((res) => {
              if(res.ok){
                res.json()
                .then(setLikesArray(likesArray.filter((liker) => liker !== currentUser.username)))
                .then(setLiked(!liked))
              } else {
                res.json().then(json => setErrors([json.errors]))
              }
        })}
      }

        return (
            <div>
                <h1>{user.name}</h1>
                <br/>
                <img className = "UserCardImg" src={user.photo} alt={user.name} width="40%" height="40%"/>
                {currentUser.id == user.id ? <br/> : null }
                {currentUser.id == user.id ? <><Link to={`${currentUser.id}`}>View Details</Link>
                  <Routes>
                    <Route path={`users/${currentUser.id}`} element={<UsersShow/>}/>
                  </Routes></> : null}
                <p>Age: {user.age}</p>
                Last Three Races:
                {user.id !== currentUser.id ? userLastThreeRaces.map(race => <li key={race.id}>{race.name}</li>) : null }
                {user.id == currentUser.id ? currentUserLastThreeRaces.map(race => <li key={race.id}>{race.name}</li>) : null }
                <p>{liked ? <button className='like' onClick={handleLikeButton}>"❤️"</button> : <button className='like' onClick={handleLikeButton}>"♡"</button>}{" "}
                  {likesArray.length !== 1 ? `${likesArray.length} Likes` : `${likesArray.length} Like`}</p>
                <br/>
                <br/>
            </div>
    )
}

export default UserCard;