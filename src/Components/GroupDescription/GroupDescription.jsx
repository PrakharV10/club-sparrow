import React from 'react'
import AvatarName from '../AvatarName/AvatarName'
import './GroupDescription.css'

function GroupDescription({groupDescModal, setGroupDescModal}) {
    return (
        <div className={groupDescModal ? "group-description-bg" : "group-description-bg hide"}>
            <header className="header">
                <svg onClick={() => setGroupDescModal(false)} viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" fill="currentColor"></path></svg>
                <span>
                    Group Name
                </span>
            </header>

            <main>
                <div className="one-block">
                    <div className="title">
                        Description
                    </div>
                    <div className="subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut mauris est augue quis. Id arcu fringilla id malesuada a, et metus aliquet.
                    </div>
                </div>

                <div className="one-block">
                    <div className="title">
                        Group Authors
                    </div>

                    <div className="group-authors">
                        <AvatarName />   
                        <AvatarName />   
                        <AvatarName />   
                        <AvatarName />   
                        <AvatarName />   
                        <AvatarName />   
                    </div>
                </div>

                <div className="one-block">
                    <div className="title">
                        Joining requests
                    </div>
                </div>
            </main>
        </div>
    )
}

export default GroupDescription
