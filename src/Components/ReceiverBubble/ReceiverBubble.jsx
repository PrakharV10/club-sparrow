import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'

function ReceiverBubble({ messageText, messageUser }) {

    const [username, setUserName] = useState("");
    
    useEffect(() => {
        db.collection('users')
            .doc(messageUser)
            .onSnapshot((data) => {
                setUserName(data.data().name)
            })
    },[])

    return (
        <div className="bubble-container">
            <div className="bubble">
                {messageText}
            </div>
            <div className="sender-name">
                {username}
            </div>
        </div>
    )
}

export default ReceiverBubble
