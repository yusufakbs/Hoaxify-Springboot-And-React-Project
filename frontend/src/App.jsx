import {Outlet} from "react-router-dom";
import {LanguageSelector} from "./shared/components/LanguageSelector.jsx";
import {NavBar} from "./shared/components/NavBar.jsx";
import {AuthenticationContext} from "./shared/state/context.jsx";
import {Provider} from "react-redux";
import {store} from "./shared/state/redux.js";


function App() {
     return ( //<AuthenticationContext>
        <Provider store={store}>
        <NavBar/>
        <div className="container mt-3">
            {<Outlet/>}
            <LanguageSelector/>
        </div>
        </Provider>
   // </AuthenticationContext>)
     )
}

export default App
