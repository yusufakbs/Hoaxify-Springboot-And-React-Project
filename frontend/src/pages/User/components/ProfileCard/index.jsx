import {useAuthDispatch, useAuthState} from "../../../../shared/state/context.jsx";
import {Button} from "../../../../shared/components/Button.jsx";
import {useState} from "react";
import {ProfileImage} from "../../../../shared/components/ProfileImage.jsx";
import {UserEditForm} from "./UserEditForm.jsx";
import {UserDeleteButton} from "../UserDeleteButton/index.jsx";

export function ProfileCard({user}) {
    const authState = useAuthState();
    const [editMode, setEditMode] = useState(false);
    const [tempImage, setTempImage] = useState();


    const isLoggedInUser = !editMode && authState.id === user.id;
    const visibleUsername = authState.id === user.id ? authState.username : user.username;

    return (<div className="card">
        <div className="card-header text-center">
            <ProfileImage width={200} tempImage={tempImage} image={user.image}/>
        </div>
        <div className="card-body text-center">
            {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
            {isLoggedInUser && (<>
                <Button onClick={() => setEditMode(true)}>Edit</Button>
                <div className="d-inline m-1"></div>
                <UserDeleteButton/>
            </>)}

            {editMode && <UserEditForm setEditMode={setEditMode} setTempImage={setTempImage}/>}
        </div>
    </div>);
}