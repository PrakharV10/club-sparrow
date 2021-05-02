import React, { useState } from 'react'
import { useAuth } from '../../context/context'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, timestamp } from '../../firebase'
import './NewGroup.css'
import { useNavigate } from 'react-router';

function NewGroup({showModal, setShowModal}) {

    const { currentUser } = useAuth();
    const [localInput, setLocalInput] = useState({
        name: "",
        description: ``,
        members : []
    })
    const navigate = useNavigate();

    function searchMemberId(userId) {
        if (localInput.members.find(one => one === userId))
            return true 
        return false
    }
    
    const usersRef = db.collection('users')
    const [users] = useCollectionData(usersRef)

    function newGroupCreationFunction(e) {
        e.preventDefault();
        if (localInput.members.length === 0)
            return
        
        db.collection('group').add({
            createdBy: currentUser.uid,
            createdAt: timestamp,
            members: localInput.members,
            title: localInput.name,
            description: localInput.description
        }).then((docRef) => {
            console.log("Group Creation Success, id :", docRef.id)
            navigate(`/group/${docRef.id}`)
        }).catch(err => {
            console.log("Some Error Occured :", err)
        })
    }

    return (
        <div className={showModal ? "new-group-bg" : "new-group-bg hide"}>
            <header>
                <svg onClick={() => setShowModal(false)} viewBox="0 0 512 512"><path d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z" fill="currentColor"></path></svg>
                <span>
                    Create New Group
                </span>
            </header>

            <form onSubmit={e => newGroupCreationFunction(e)}>
                <div className="one-block">
                    <div className="title">
                        Topic of the Discussion?
                    </div>
                    <input
                        value={localInput.name}
                        onChange = {(e) => setLocalInput({...localInput, name : e.target.value})}
                        placeholder="Start Typing here..."
                        type="text"
                        required
                    />
                </div>
                <div className="one-block">
                    <div className="title">
                        Add Some Description!
                    </div>
                    <textarea
                        value={localInput.description}
                        onChange = {(e) => setLocalInput({...localInput, description : e.target.value})}
                        name="description"
                        placeholder="Text Goes Here!" ></textarea>
                </div>
                <div className="one-block">
                    <div className="title">
                        Add your Friends!!
                    </div>
                    <div className="user-list">
                        { users && 
                            users.map(user => {
                                if (user.uid === currentUser.uid)
                                    return null
                                return (
                                    <div key={user.uid} className="one-user">
                                        <div className="username">
                                            {user.name}
                                        </div>
                                        <div
                                            onClick={() => setLocalInput({ ...localInput, members: [...localInput.members, user.uid] })} className="add-btn">
                                            {searchMemberId(user.uid) ? `ADDED` : `ADD`}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
                <div className="button-grp">
                    <button
                        type="submit"
                        className="btn btn-black"
                        disabled = {localInput.members.length === 0}
                    >PROCEED</button>
                </div>

            </form>
        </div>
    )
}

export default NewGroup
