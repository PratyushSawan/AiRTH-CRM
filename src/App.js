import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AuthProvider } from "components/contexts/AuthContext";
import AdminLayout from "./layouts/Admin"
import AuthLayout from "./layouts/Auth"
import BackendLayout from "./layouts/Backend"
import CustomerLayout from "./layouts/Customer"


function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <Route path="/admin" render={(props) => <AdminLayout {...props} />} />

                    <Route path="/backend" render={(props) => <BackendLayout {...props} />} />

                    <Route path="/customer" render={(props) => <CustomerLayout {...props} />} />

                    <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
                    <Redirect from="/" to="/admin/index" />
                </Switch>
            </AuthProvider>
        </Router>
    )
}

export default App
