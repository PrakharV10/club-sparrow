import React from 'react'
import { useNavigate } from 'react-router';
import './GroupListing.css'

function GroupListing({ details }) {
    
    const navigate = useNavigate();

    return (
        <div className="group-listing" onClick={() => navigate(`${details.id}`)}>
            <div className="creation-time">
                12:00 AM
            </div>
            <div className="group-topic">
                {details.title}
            </div>
            <div className="group-description">
                {details.description}
            </div>
        </div>
    )
}

export default GroupListing
