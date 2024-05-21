import ReactDOM from 'react-dom/client'
import "./styles.scss"
import "./locales"
import {RouterProvider} from "react-router-dom"
import router from "./router/index.js";

ReactDOM.createRoot(document.getElementById('root')).render(
        <RouterProvider router={router}/>
        /* <BrowserRouter>*/
        /*    <Routes>*/
        /*        <Route path="/" element={<HomePage/>}/>*/
        /*        <Route path="/signup" element={<SignUp/>}/>*/
        /*    </Routes>*/
        /*</BrowserRouter>*/
)
