import React, { useState } from 'react'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import GroupListing from '../../Components/GroupListing/GroupListing'
import NewGroup from '../../Components/NewGroup/NewGroup'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import { db } from '../../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import './ChatListing.css'

function ChatListing() {

    const [showModal, setShowModal] = useState(false)

    const groupRef = db.collection('group')
    const [groups] = useCollectionData(groupRef, { idField: 'id' })

    return (
        <div className="chat-listing">
            <ChatHeader />
            <ToggleButton />
            <div className="group-lists">
                {   groups && 
                    groups.map(one => {
                        return (
                            <div key={one.id}>
                                <GroupListing details={one} />
                            </div>
                        )
                    })
                }
            </div>
            <NewGroup showModal={showModal} setShowModal={setShowModal} />
            <footer>
                <button
                    onClick = {() => setShowModal(true)}
                    className="btn btn-black">CREATE NEW GROUP</button>
            </footer>
        </div>
    )
}

export default ChatListing
