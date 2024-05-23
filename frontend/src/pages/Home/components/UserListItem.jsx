import defaultProfileImage from "/src/assets/profile.png"
import {Link} from "react-router-dom";

export function UserListItem({user}) {
    return (<Link className="list-group-item list-group-item-action" to={`/user/${user.id}`}
                  style={{textDecoration: 'none'}}>
        <img className="img-fluid rounded-circle shadow-sm" width="30" src={defaultProfileImage}/>
        <span className="ms-2">
            {user.username}
        </span>
    </Link>)
}