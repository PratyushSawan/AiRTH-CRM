import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function BackendRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return (
        <Route
            {...rest}
            render={props => {
                if (currentUser?.uid === 'rtuxRbBG4KRvkSFFdHX9vKPwKAH3') {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/auth/loginAsAdmin" />
                }
                // return currentUser ? <Component {...props} /> : <Redirect to="/auth" />
            }}
        ></Route>
    )
}
