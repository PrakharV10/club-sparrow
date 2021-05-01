import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

function Login() {
    return (
        <div className="login-page">
            <form>
                <div className="form-title">
                    LOGIN
                </div>
                <div className="form-subtitle">
                    Please Enter your Email & Password
                </div>
                <div className="form-input">
                    <input placeholder="Email" type="mail" required/>
                    <input placeholder="Password" type="password" required/>
                </div>
                <button type="submit" className="btn btn-black">
                    LOGIN
                </button>
                <div className="form-switch">
                    Don't have an account? 
                    <Link to="/signup" >
                        <span>
                            {" "}Sign up!
                        </span>
                    </Link>    
                </div>
            </form>
        </div>
    )
}

export default Login
