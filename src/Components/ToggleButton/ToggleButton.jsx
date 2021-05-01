import React, { useState } from 'react'
import './ToggleButton.css'

function ToggleButton() {
    
    const [clickValue, setClickValue] = useState(0);

    return (
        <div className="toggle-button">
            <div className="outer-rectangle">
                <div onClick={() => setClickValue(0)} className={clickValue === 0 ? "text a" : "text a black"} >
                    Active
                </div>
                <div onClick={() => setClickValue(1)} className={clickValue === 1 ? "text b white" : "text b"}>
                    Archived
                </div>
                <div className={clickValue === 0 ? "inner-rectangle" : "inner-rectangle right"}>
                </div>
            </div>
        </div>
    )
}

export default ToggleButton
