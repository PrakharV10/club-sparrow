import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useAuth } from '../../context/context';
import { db } from '../../firebase';
import './Profile.css'

function Profile() {

    const [showMenu, setShowMenu] = useState(false)
    const { currentUser } = useAuth();
    const [localUser, setLocalUser] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        db.collection('users')
            .doc(currentUser.uid)
            .onSnapshot(doc => {
                setLocalUser(doc.data().name)
            })
    }, [])

    return (
        <div className="profile-page">
            <header className="chat-header">
                <Sidebar showMenu={showMenu} setShowMenu={setShowMenu} />
                <div onClick={() => setShowMenu(!showMenu)} className="menu-icon">
                    <svg width="1em" height="1em" viewBox="0 0 24 24"><g fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2zm0 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2zm0 6a2 2 0 0 1 2-2h16a2 2 0 1 1 0 4H4a2 2 0 0 1-2-2z" fill="currentColor"></path></g></svg>
                </div>
            </header>

            <main>
                <div className="square-avatar">
                    <img src="https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="sq-avatar"/>
                </div>

                <div className="name">
                    {localUser && localUser}
                </div>

                <div className="email">
                    {currentUser.email && currentUser.email}
                </div>
            </main>

            <footer>
                <button onClick={() => navigate('/group')} className="btn btn-black">
                    <svg width="1em" height="1em" viewBox="0 0 512 512"><path d="M460.6 147.3L353 256.9c-.8.8-.8 2 0 2.8l75.3 80.2c5.1 5.1 5.1 13.3 0 18.4-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8l-75-79.9c-.8-.8-2.1-.8-2.9 0L313.7 297c-15.3 15.5-35.6 24.1-57.4 24.2-22.1.1-43.1-9.2-58.6-24.9l-17.6-17.9c-.8-.8-2.1-.8-2.9 0l-75 79.9c-2.5 2.5-5.9 3.8-9.2 3.8s-6.7-1.3-9.2-3.8c-5.1-5.1-5.1-13.3 0-18.4l75.3-80.2c.7-.8.7-2 0-2.8L51.4 147.3c-1.3-1.3-3.4-.4-3.4 1.4V368c0 17.6 14.4 32 32 32h352c17.6 0 32-14.4 32-32V148.7c0-1.8-2.2-2.6-3.4-1.4z" fill="currentColor"></path><path d="M256 295.1c14.8 0 28.7-5.8 39.1-16.4L452 119c-5.5-4.4-12.3-7-19.8-7H79.9c-7.5 0-14.4 2.6-19.8 7L217 278.7c10.3 10.5 24.2 16.4 39 16.4z" fill="currentColor"></path></svg>
                </button>
            </footer>
        </div>
    )
}

export default Profile;