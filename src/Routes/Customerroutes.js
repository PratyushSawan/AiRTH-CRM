
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Products from "views/Products/Products";
import Product from "views/Product/Product";


var routes = [
    {
        path: "/index",
        name: "Products",
        icon: "ni ni-tv-2 text-primary",
        component: Products,
        layout: "/customer",
    },
    {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/customer",
    },

];
export default routes;
