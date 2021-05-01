import React from 'react'
import './Landing.css'
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="landing-page">
            <div className="title-logo">
                sparrow
            </div>
            <div className="logo">
                <img src={logo} alt="logo pic"/>
            </div>
            <div className="button-group">
                <Link to="/login">
                    <button className="btn btn-black">
                        LOGIN
                    </button>
                </Link>
                <Link to="/register">
                    <button className="btn btn-outline">
                        REGISTER
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Landing
