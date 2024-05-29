import defaultProfileImage from "/src/assets/profile.png"
import {useAuthState} from "../../../../shared/state/context.jsx";
import {Button} from "../../../../shared/components/Button.jsx";
import {useSelector} from "react-redux";

export function ProfileCard({user}) {
    // const authState = useAuthState();
    const authState = useSelector((store) => store.auth);
    return (<div className="card">
        <div className="card-header text-center">
            <img className="img-fluid rounded-circle shadow-sm" width="200" src={defaultProfileImage}/>
        </div>
        <div className="card-body text-center">
            <span className="fs-3">{user.username}</span>
            {authState.id === user.id && <Button>Edit</Button>}
        </div>
    </div>)
}