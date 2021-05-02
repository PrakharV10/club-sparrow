import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import Sidebar from '../Sidebar/Sidebar'
import './ChatHeader.css'

function ChatHeader() {

    const [showMenu, setShowMenu] = useState(false)

    return (
        <div className="chat-header">
            <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
            <div onClick={() => setShowMenu(!showMenu)} className="menu-icon">
                <svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2zm0 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2zm0 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2z" fill="currentColor"></path></g></svg>
            </div>
            <div className="title">
                Chats
            </div>
            <div className="search-icon">
                <SearchBar />
            </div>
        </div>
    )
}

export default ChatHeader
