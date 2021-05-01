import React from 'react'
import ChatHeader from '../../Components/ChatHeader/ChatHeader'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import './ChatListing.css'

function ChatListing() {
    return (
        <div className="chat-listing">
            <ChatHeader />
            <ToggleButton />
        </div>
    )
}

export default ChatListing
