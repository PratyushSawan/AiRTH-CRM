
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Products from "views/Products/Products";
import Product from "views/Product/Product";
import AdminLogin from "views/examples/AdminLogin";
// import Products from "views/Products/Products";

var routes = [
  {
    path: "/index",
    name: "Index",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "ni ni-pin-3 text-orange",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin",
  },
  //Backend Routes
  {
    path: "/index",
    name: "Products",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/backend",
  },
  // Customer Routes
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
  {
    path: "/Product/A4322J",
    name: "A4322J",
    icon: "ni ni-tablet-button",
    component: Product,
    layout: "/customer",
  },

  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
  {
    path: "/loginAsAdmin",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: AdminLogin,
    layout: "/auth",
  },
];
export default routes;
