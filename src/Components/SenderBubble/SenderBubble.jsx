import React from 'react'
import './SenderBubble.css'

function SenderBubble({messageText}) {
    return (
        <div className="bubble-container sender">
            <div className="bubble sender">
                {messageText}
            </div>
            <div className="sender-name sender">
                You
            </div>
        </div>
    )
}

export default SenderBubble
