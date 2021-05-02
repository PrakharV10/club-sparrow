import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/context'
import './Sidebar.css'

function Sidebar({ showMenu, setShowMenu }) {
    
    const { logout} = useAuth();
    const navigate = useNavigate();

    async function logOutHandler() {
        try {
            await logout()
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={showMenu ? "side-bar-bg show" : "side-bar-bg"}>
            <div className={showMenu ? "sidebar view" : "sidebar"} >
                <ul className="sidebar-links">
                    <Link to="/profile" onClick={() => setShowMenu(false)}>
                        <li>PROFILE</li>
                    </Link>
                    
                    <Link to="/group" onClick={() => setShowMenu(false)} >
                        <li>GROUPS</li>
                    </Link>

                    <li onClick={() => logOutHandler()}>LOGOUT</li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
