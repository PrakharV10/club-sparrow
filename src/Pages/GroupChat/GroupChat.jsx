import React, { useEffect, useState } from 'react'
import './GroupChat.css'
import { useNavigate, useParams } from 'react-router'
import { db, FieldValue } from '../../firebase';
import { useAuth } from '../../context/context';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import MessageType from '../../Components/MessageType/MessageType';
import SenderBubble from '../../Components/SenderBubble/SenderBubble';
import ReceiverBubble from '../../Components/ReceiverBubble/ReceiverBubble';
import GroupDescription from '../../Components/GroupDescription/GroupDescription';

function GroupChat() {

    let { groupId } = useParams();
    const [groupDetails, setGroupDetails] = useState({})
    const [groupDescModal, setGroupDescModal] = useState(false)
    const [activeState, setActiveState] = useState();
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        db.collection('group').doc(groupId)
        .onSnapshot(doc => {
            setGroupDetails(doc.data())
            setActiveState(doc.data().active)
        })
    }, [])

    const messagesRef = db.collection(`message/${groupId}/messages`);
    const messageQuery = messagesRef.orderBy("sentAt").limit(25);
    const [messages] = useCollectionData(messageQuery, {idField : 'id'});
    
    function checkUserInGroup(userId) {
        if (groupDetails && groupDetails.members.find(one => one === userId)) {
            return true   
        }
        return false
    }

    function checkUserInRequest() {
        if (groupDetails.request && groupDetails.request.find(one => one === currentUser.uid))
            return true
        else
            return false
    }

    async function joinRequestHandler() {
        try {
            await db.collection('group')
            .doc(groupId)
            .set({
                request : FieldValue.arrayUnion(currentUser.uid)
            }, { merge: true })
            console.log("Request Successfully Sent")
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <div className="group-chat">
            <div className="header">
                <div className="top-header">
                    <svg onClick={() => navigate('/group')} viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" fill="currentColor"></path></svg>

                    <div onClick={() => setGroupDescModal(true)} className="details">
                        <div className="title">{groupDetails.title}</div>
                        <div className="description">{groupDetails.description}</div>
                    </div>
                </div>
                <GroupDescription groupDetails={groupDetails} groupDescModal={groupDescModal} setGroupDescModal={setGroupDescModal} />
            </div>

            <main>
                {   messages && 
                    messages.map(one => {
                        if (one.sentBy === currentUser.uid) {
                            return (
                                <SenderBubble key={one.id} messageText={one.messageText}/>
                            )
                        } else {
                            return (
                                <div key={one.id}>
                                    <ReceiverBubble messageText={one.messageText} messageUser = {one.sentBy} />
                                </div>
                            )
                        }
                    })
                }
            </main>

            <footer>
                { activeState === 1 && (groupDetails.members && checkUserInGroup(currentUser.uid) ?
                    <MessageType groupId={groupId}/>
                        :
                        <button onClick={joinRequestHandler} className="btn btn-black">
                            {checkUserInRequest() ? `REQUEST HAS BEEN SENT` : `JOIN THE CONVERSATION`}
                        </button>)
                }
                {
                    activeState === 0 &&
                        <div>
                            The Group has been deleted.
                        </div>
                }
            </footer>
        </div>
    )
}

export default GroupChat
