import React from 'react'
import ReactDOM from 'react-dom/client'
import {SignUp} from "./pages/SignUp/index.jsx";
import "./styles.scss"
import "./locales"

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <SignUp/>
</React.StrictMode>,)
