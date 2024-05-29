import {Link} from "react-router-dom";
import logo from "../../assets/hoaxify.png";
import {useTranslation} from "react-i18next";
import {useAuthDispatch, useAuthState} from "../state/context.jsx";
import {useDispatch, useSelector} from "react-redux";
import {logoutSuccess} from "../state/redux.js";

export function NavBar() {
    const {t} = useTranslation();
    // const authState = useAuthState();
    // const dispatch = useAuthDispatch();
    const authState = useSelector((store) => store.auth);
    const dispatch = useDispatch();

    const onClickLogout = () => {
        dispatch(logoutSuccess());
    }
    return (<nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container">
            <Link className="navbar-brand" to="/">
                <img src={logo} className="img-fluid" alt="logo" width={60}/>
                Hoaxify
            </Link>
            <ul className="navbar-nav">
                {authState.id === 0 && (<>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">
                            {t('signUp')}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/Login" className="nav-link">
                            {t('login')}
                        </Link>
                    </li>
                </>)}
                {authState.id > 0 && (<>
                    <li className="nav-item">
                        <Link to={`/user/${authState.id}`} className="nav-link">
                            My Profile
                        </Link>
                    </li>
                    <li className="nav-item">
                        <span className="nav-link" role="button" onClick={onClickLogout}>Logout</span>
                    </li>
                </>)}

            </ul>
        </div>
    </nav>)
}