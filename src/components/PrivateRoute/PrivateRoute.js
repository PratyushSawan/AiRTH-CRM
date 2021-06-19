import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser && currentUser?.uid != 'rtuxRbBG4KRvkSFFdHX9vKPwKAH3') {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/auth" />
                }
                // return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
            }}
        ></Route>
    )
}
