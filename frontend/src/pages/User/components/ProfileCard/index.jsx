import defaultProfileImage from "/src/assets/profile.png"

export function ProfileCard({user}) {
    return (<div className="card">
        <div className="card-header text-center">
            <img className="img-fluid rounded-circle shadow-sm" width="200" src={defaultProfileImage}/>
        </div>
        <div className="card-body text-center">
            <span className="fs-3">{user.username}</span>
        </div>
    </div>)
}