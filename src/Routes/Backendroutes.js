
import Index from "views/Backend/Index";
import Products from "views/Backend/Products";
import Registration from "views/Backend/Registration";
import Icons from "views/examples/Icons";


var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ni ni-tv-2 text-primary",
        component: Index,
        layout: "/backend",
    },
    {
        path: "/Products",
        name: "Products",
        icon: "ni ni-mobile-button text-danger",
        component: Products,
        layout: "/backend",
    },
    {
        path: "/Registration",
        name: "New Device",
        icon: "ni ni-fat-add text-sucess",
        component: Registration,
        layout: "/backend",
    },
    {
        path: "/icon",
        name: "Icon",
        icon: "ni ni-tv-2 text-sucess",
        component: Icons,
        layout: "/backend",
    },
];
export default routes;
