import defaultProfileImage from "/src/assets/profile.png"

export function UserListItem({user}) {

    return (<li className="list-group-item list-group-item-action">
        <img className="img-fluid rounded-circle shadow-sm" width="30" src={defaultProfileImage}/>
        <span className="ms-2">
            {user.username}
        </span>
    </li>)
}