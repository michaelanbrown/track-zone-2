import React, { useContext } from "react";
import './App.css';
import { useParams } from "react-router-dom";
import { UserContext } from '../context/User';

function LengthsShow({ lengths, races }) {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const {id} = useParams();

    const currentLength = (lengths.filter(length => length.id == id)[0])
    const userRaces = races.filter(race => race.user.id == currentUser.id && race.length.id == id)
    

        return (
            <div>
                <h1>{currentLength ? currentLength.distance : null}{' '}{currentLength ? currentLength.measurement : null} Races!</h1>
                <br/>
                {userRaces ? userRaces.map(race => <li key={race.id}>{race.name}{' - '}{race.year}<p>Final Time: {race.duration}</p></li>) : null }
            </div>
    )
}

export default LengthsShow;