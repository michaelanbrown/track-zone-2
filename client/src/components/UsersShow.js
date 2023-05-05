import React, { useContext } from "react";
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/User';
import LengthsShow from "./LengthsShow";

function UsersShow({  }) {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(UserContext);


    // const userLengths = currentUser.lengths.map(length => {
    //     return (<><Link to={`/${length.id}`}>View Details</Link>
    //     <Routes>
    //         <Route path={`lengths/${length.id}`} element={<LengthsShow/>}/>
    //     </Routes></>)
    // })

    
        return (
            <div>
            <h1 className = "centering">{currentUser.name}</h1>
            <img className = "UserCardImg" src={currentUser.photo} alt={currentUser.name} width="40%" height="40%"/>
            <p>Age: {currentUser.age}</p>
            {currentUser.lengths ? currentUser.lengths.map(length => <Link to={`/lengths/${length.id}`} key={length.id}><li>{length.distance}{' '}{length.measurement}</li></Link>) : null }
        </div>
    )
}

export default UsersShow;