import React from 'react'
import { Navigate, Route } from 'react-router';
import { useAuth } from './context/context'

function PrivateRoute({ path, ...props }) {
    
    const { currentUser } = useAuth();

    return (
        currentUser
            ?
            <Route {...props} path={path} />
            :
            <Navigate
                state={{ from: path }}
                replace
                to="/login"
            />
    )
}

export default PrivateRoute
