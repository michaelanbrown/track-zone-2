import React, { useContext } from "react";
import './App.css';
import { useParams } from "react-router-dom";
import { UserContext } from '../context/User';

function LengthsShow({ lengths, races }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {id} = useParams();

    const currentLength = lengths.filter(length => length.id == id)
    const userRaces = races.filter(race => race.user.id == currentUser.id && race.length.id == id)
console.log(currentLength)

        return (
            <div>
                <h1>{currentLength.distance}{' '}{currentLength.measurement}</h1>
                <br/>
                {userRaces ? userRaces.map(race => <li key={race.id}>{race.name}{' - '}{race.year}<p>Final Time: {race.duration}</p></li>) : null }
            </div>
    )
}

export default LengthsShow;