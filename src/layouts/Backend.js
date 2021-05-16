
import React from "react";
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import routes from "../Routes/Backendroutes";
import BackendRoute from "components/BackendRoute/BackendRoute";
import Product from "views/Backend/Product";

const Backend = (props) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/backend") {
                return (
                    <BackendRoute
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            } else {
                return null;
            }
        });
    };

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            if (
                props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
                -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    return (
        <>
            <Sidebar
                {...props}
                routes={routes}
                logo={{
                    innerLink: "/backend/index",
                    imgSrc: require("../assets/img/brand/Airth-logo.webp").default,
                    imgAlt: "...",
                }}
            />
            <div className="main-content" ref={mainContent}>
                <AdminNavbar
                    {...props}
                    brandText={getBrandText(props.location.pathname)}
                />
                <Switch>
                    {getRoutes(routes)}
                    <BackendRoute exact path="/backend/product/:pid" component={Product} />
                    <Redirect from="*" to="/backend/index" />
                </Switch>
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Backend;