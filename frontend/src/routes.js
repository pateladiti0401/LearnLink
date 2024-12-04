import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import LogoutDialog from "./layouts/authentication/logout";
// @mui icons
import Icon from "@mui/material/Icon";
import NewLab from "layouts/newlab";
//import Details from "layouts/details";
const isAuthenticated = !!localStorage.getItem("token");
const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // !isAuthenticated && {
  //   type: "collapse",
  //   name: "All Labs",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/labs/:name",
  //   component: <Details />,
  // },
  {
    type: "collapse",
    name: "Create new Lab",
    key: "newlab",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/labs/newlab",
    component: <NewLab />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  !isAuthenticated && {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  !isAuthenticated && {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Logout",
    key: "logout",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/logout",
    component: <LogoutDialog />,
  },
].filter(Boolean);

export default routes;
