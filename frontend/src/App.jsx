import {Outlet} from "react-router-dom";
import {LanguageSelector} from "./shared/components/LanguageSelector.jsx";
import {Index} from "./shared/components/NavBar/index.jsx";
import {AuthenticationContext} from "./shared/state/context.jsx";


function App() {
    return (<AuthenticationContext>
        <Index/>
        <div className="container mt-3">
            {<Outlet/>}
            <LanguageSelector/>
        </div>
    </AuthenticationContext>);
}

export default App
