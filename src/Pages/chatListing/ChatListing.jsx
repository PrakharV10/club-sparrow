import React from 'react'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import GroupListing from '../../Components/GroupListing/GroupListing'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import './ChatListing.css'

function ChatListing() {
    return (
        <div className="chat-listing">
            <ChatHeader />
            <ToggleButton />
            <div className="group-lists">
                <GroupListing />
            </div>

            <footer>
                <button className="btn btn-black">CREATE NEW GROUP</button>
            </footer>
        </div>
    )
}

export default ChatListing
