import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import './AvatarName.css'

function AvatarName({ member }) {

    const [localUser, setLocalUser] = useState({})
    
    useEffect(() => {
        db.collection('users')
            .doc(member)
            .onSnapshot(doc => {
                setLocalUser(doc.data())
            })
    }, [])

    return (
        <div className="avatar-name">
            <div className="avatar">
                {
                    localUser.imageUrl ?
                        <img src={localUser.imageUrl} alt="Avatar" />
                        :
                        <img src="https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="Avatar" />
                }
            </div>
            <div className="name">
                {localUser.name && localUser.name.split(' ')[0]}
            </div>
        </div>
    )
}

export default AvatarName
