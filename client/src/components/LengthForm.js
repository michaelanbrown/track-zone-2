import React from "react";
import './App.css';

function LengthForm({ lengthFormShow, setLengthFormShow}) {

    // km mi m

  return (
    <div>
        Distance: <input type='text' name='distance' value={distance} onChange={handleChange} />
        <br/>
        Measurement: <select id="measurement" onChange={handleMeaurementChange}>
        {measurementOptions}
        </select>
    </div>
  );
}

export default LengthForm;