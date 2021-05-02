import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/context';
import { db, timestamp } from '../../firebase';
import './MessageType.css'

function MessageType({ groupId }) {

    const [localInput, setLocalInput] = useState(``);
    const { currentUser } = useAuth();
    const [activeState, setActiveState] = useState();

    function sendMessageHandler() {
        if (localInput === "")
            return
        setLocalInput(``);
        db.collection(`message`)
            .doc(groupId)
            .collection('messages')
            .add({
                messageText: localInput,
                sentAt: timestamp,
                sentBy: currentUser.uid
            })
            .catch(err => {
                console.log("Some error Occured", err)
            })
    }

    useEffect(() => {
        db.collection('group')
            .doc(groupId)
            .onSnapshot(doc => {
                setActiveState(doc.data().active)
            })
    }, [])

    if (activeState === 1) {
        return (
            <div className="message-footer">
                <svg className="emoji" width="1em" height="1em" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11S7 10.33 7 9.5S7.67 8 8.5 8zm8.25 6.75c-.95 1.64-2.72 2.75-4.75 2.75s-3.8-1.11-4.75-2.75c-.19-.33.06-.75.44-.75h8.62c.39 0 .63.42.44.75zM15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z" fill="currentColor"></path></svg>
    
                <textarea
                    value={localInput}
                    onChange={e => setLocalInput(e.target.value)}
                    placeholder="Type a Message" />
    
                <svg onClick={sendMessageHandler} className="send-button" width="1em" height="1em" viewBox="0 0 32 32"><path d="M27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78z" fill="currentColor"></path></svg>
            </div>
            
        )   
    } else {
        return (
            <footer>
                <div>
                    The Group has been deleted
                </div>
            </footer>
        )
    }
}

export default MessageType
