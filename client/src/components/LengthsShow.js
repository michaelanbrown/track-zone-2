import React, { useContext } from "react";
import './App.css';
import { useParams, Link } from "react-router-dom";
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
                {userRaces ? userRaces.map(race => <div key={race.id}><li>{race.name}{' - '}{race.year}<br/>Final Time: {race.duration}{' '}{' '}
                <br/>
                <Link to={`/races/${race.id}`}>Update or delete this race!</Link>{' '}
                  </li><br/></div>) : null }
            </div>
    )
}

export default LengthsShow;