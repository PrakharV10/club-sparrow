import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../../context/context'
import { db } from '../../firebase'
import AvatarName from '../AvatarName/AvatarName'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import RequestBox from '../RequestBox/RequestBox'
import './GroupDescription.css'

function GroupDescription({ groupDetails = [], groupDescModal, setGroupDescModal }) {

    const { currentUser } = useAuth();
    const [confirmModal, setConfirmModal] = useState(false);
    const { groupId } = useParams();
    const [activeState, setActiveState] = useState();
    
    function checkUserInGroupMembers() {
        if (groupDetails.members && groupDetails.members.find(member => member === currentUser.uid))
            return true
        return false
    }

    function checkUserIsAdmin() {
        if (groupDetails.createdBy && groupDetails.createdBy === currentUser.uid)
            return true
        return false
    }

    useEffect(() => {
        db.collection('group')
            .doc(groupId)
            .onSnapshot(doc => {
                setActiveState(doc.data().active)
            })
    }, [])

    return (
        <div className={groupDescModal ? "group-description-bg" : "group-description-bg hide"}>
            <header className="header">
                <svg onClick={() => setGroupDescModal(false)} viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" fill="currentColor"></path></svg>
                <span>
                    {groupDetails.title}
                </span>
            </header>

            <main>
                <div className="one-block">
                    <div className="title">
                        Description
                    </div>
                    <div className="subtitle">
                        {groupDetails.description}
                    </div>
                </div>

                <div className="one-block">
                    <div className="title">
                        Group Authors
                    </div>

                    <div className="group-authors">
                        {   groupDetails.members && 
                            groupDetails.members.map(member => {
                                return (
                                    <AvatarName key={member} member={member} />
                                )
                            })
                        }
                    </div>
                </div>

                {checkUserInGroupMembers() && <div className="one-block">
                    <div className="title">
                        Joining requests
                    </div>

                    <div className="request-container">
                        {
                            groupDetails.request && groupDetails.request.map(one => {
                                return (
                                    <RequestBox key={one} request={one} />
                                )
                            })
                        }
                    </div>
                </div>}

                {
                    activeState === 1 && checkUserIsAdmin &&
                    <footer>
                        <button onClick={() => setConfirmModal(true)} className="btn btn-black">
                            DELETE GROUP
                        </button>
                        <ConfirmModal setConfirmModal={setConfirmModal} confirmModal={confirmModal} />
                    </footer>
                }

                {
                    activeState === 0 &&
                    <footer>
                        <div>
                            The Group has been Deleted.
                        </div>
                    </footer>
                }
            </main>
        </div>
    )
}

export default GroupDescription
