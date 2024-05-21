import {Link} from "react-router-dom";
import logo from "../../assets/hoaxify.png";
import {useTranslation} from "react-i18next";

export function NavBar() {
    const {t} = useTranslation();
    return (<nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logo} className="img-fluid" alt="logo" width={60}/>
                Hoaxify
            </Link>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                        {t('signUp')}
                    </Link>
                </li>
            </ul>
        </div>
    </nav>)
}