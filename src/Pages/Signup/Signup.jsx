import React from 'react'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <div className="login-page">
            <form>
                <div className="form-title">
                    REGISTER
                </div>
                <div className="form-subtitle">
                    Please fill in the information below
                </div>
                <div className="form-input">
                    <input placeholder="Name" type="text" required/>
                    <input placeholder="Email" type="mail" required/>
                    <input placeholder="Password" type="password" required/>
                </div>
                <button type="submit" className="btn btn-black">
                    SIGNUP
                </button>
                <div className="form-switch">
                    Already have an account? 
                    <Link to="/login" >
                        <span>
                            {" "}Log In!
                        </span>
                    </Link>    
                </div>
            </form>
        </div>
    )
}

export default Signup
