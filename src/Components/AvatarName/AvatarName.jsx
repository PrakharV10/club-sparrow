import React from 'react'
import './AvatarName.css'

function AvatarName({imageUrl, name = "PV"}) {
    return (
        <div className="avatar-name">
            <div className="avatar">
                {
                    imageUrl ?
                        <img src={imageUrl} alt="Avatar" />
                        :
                        <img src="https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Avatar" />
                }
            </div>
            <div className="name">
                {name}
            </div>
        </div>
    )
}

export default AvatarName
