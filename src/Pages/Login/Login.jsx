import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/context';
import './Login.css'

function Login() {

    const navigate = useNavigate();
    const { state } = useLocation();

    const { currentUser, login } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [localInput, setLocalInput] = useState({
        email: "",
        password : ""
    })

    async function formSubmitHandler(e) {
        e.preventDefault();
        setLoading(true)
        try {
            setErrorMessage("")
            await login(localInput.email, localInput.password)
        } catch (err) {
            setErrorMessage("Some Error Occured!")
        }

        setLoading(false)
    }

    useEffect(() => {
        currentUser && navigate(state?.form ? state.form : "/chats")
    })

    return (
        <div className="login-page">
            <form onSubmit={e => formSubmitHandler(e)}>
                <div className="form-title">
                    LOGIN
                </div>
                <div className="form-subtitle">
                    Please Enter your Email & Password
                </div>
                {errorMessage && <div className="error-message">
                    {errorMessage}
                </div>}
                <div className="form-input">
                    <input
                        placeholder="Email"
                        type="mail"
                        value={localInput.email}
                        onChange={(e) => setLocalInput(localInput => ({ ...localInput, email: e.target.value }))}
                        required />
                    <input
                        placeholder="Password"
                        type="password"
                        value={localInput.password}
                        onChange={(e) => setLocalInput(localInput => ({ ...localInput, password: e.target.value }))}
                        required />
                </div>
                <button type="submit" className="btn btn-black">
                    {loading ? `LOGGIN IN...` : `LOGIN` }
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
