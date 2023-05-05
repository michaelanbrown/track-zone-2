import React from "react";
import NavBar from "./NavBar";
import './App.css';

function Header() {


  return (
    <div className="Header">
      <header>
        <h1>
        <span role="img" aria-label="plane"></span>🏃‍♀️ Welcome to Track Zone! 🏃‍♂️<span role="img" aria-label="globe"></span>
        <br/>
        </h1>
          <p><em>Check out all of the runners, their races, and distances!</em></p>
        <div>
            <NavBar />
        </div>  
      </header>
    </div>
  );
}

export default Header;