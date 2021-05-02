import React from 'react'
import './ToggleButton.css'

function ToggleButton({activeValue, setActiveValue}) {

    return (
        <div className="toggle-button">
            <div className="outer-rectangle">
                <div onClick={() => setActiveValue(1)} className={activeValue === 1 ? "text a" : "text a black"} >
                    Active
                </div>
                <div onClick={() => setActiveValue(0)} className={activeValue === 0 ? "text b white" : "text b"}>
                    Archived
                </div>
                <div className={activeValue === 0 ? "inner-rectangle right" : "inner-rectangle"}>
                </div>
            </div>
        </div>
    )
}

export default ToggleButton
