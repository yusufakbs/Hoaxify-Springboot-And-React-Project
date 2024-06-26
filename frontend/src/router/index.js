import {createBrowserRouter} from "react-router-dom";
import {HomePage} from "../pages/Home/index.jsx";
import {SignUp} from "../pages/SignUp/index.jsx";
import App from "../App.jsx";
import {ActivationPage} from "../pages/Activation/index.jsx";
import {Login} from "../pages/Login/index.jsx";
import {User} from "../pages/User/index.jsx";

export default createBrowserRouter([{
    path: "/", Component: App, children: [{
        path: "/", index: true, Component: HomePage, // errorElement:<HomePage message="Unexpected error"/>,
    }, {
        path: "/signup", Component: SignUp,
    }, {
        path: "/activation/:token", Component: ActivationPage,
    }, {
        path: "/login", Component: Login,
    }, {
        path: "/user/:id", Component: User,
    }]

}])
