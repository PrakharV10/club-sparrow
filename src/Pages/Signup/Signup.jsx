import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/context'
import { db } from '../../firebase';

function Signup() {

    const { signup, currentUser } = useAuth();
    const navigate = useNavigate();
    const { state } = useLocation();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [localInput, setLocalInput] = useState({
        name : "",
        email: "",
        password : ""
    })

    function passwordChecker(e) {
        const currentPass = e.target.value
        if (currentPass.trim().length !== currentPass.length) {
            setErrorMessage("Space in Password not Supported")
        } else {
            setLocalInput(localInput => ({ ...localInput, password: e.target.value }))
            setErrorMessage("");
        }
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        setLoading(true);

        try {
            setErrorMessage("");
            const credentials = await signup(localInput.email, localInput.password)
            db.collection('users').doc(credentials.user.uid).set({
                name : localInput.name,
                email: localInput.email,
                uid: credentials.user.uid,
                groups : []
            })
        } catch (err) {
            setErrorMessage("Some Error Occured. Try Again")
        }

        setLoading(false)
    }

    useEffect(() => {
        currentUser && navigate(state?.form ? state.form : "/profile")
    },[])

    return (
        <div className="login-page">
            <form onSubmit={(e) => handleFormSubmit(e)} >
                <div className="form-title">
                    REGISTER
                </div>
                <div className="form-subtitle">
                    Please fill in the information below
                </div>
                {errorMessage && <div className="error-message">
                    {errorMessage}
                </div>}
                <div className="form-input">
                    <input
                        placeholder="Name"
                        value={localInput.name}
                        onChange = {e => setLocalInput({...localInput, name : e.target.value})}
                        type="text"
                        required />
                    <input
                        placeholder="Email"
                        value={localInput.email}
                        onChange = {e => setLocalInput({...localInput, email : e.target.value})}
                        type="mail"
                        required />
                    <input
                        placeholder="Password"
                        value={localInput.password}
                        onChange = {e => passwordChecker(e)}
                        type="password"
                        required />
                </div>

                <button type="submit" className="btn btn-black">
                    {loading ? `SIGNING IN ...` : `SIGNUP`}
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
