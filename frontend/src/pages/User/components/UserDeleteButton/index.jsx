import {Button} from "../../../../shared/components/Button.jsx";
import {useUserDeleteButton} from "./useUserDeleteButton.js";

export function UserDeleteButton(){
    const {apiProgress, onClick} = useUserDeleteButton();
    return <Button styleType="danger" apiProgress={apiProgress} onClick={onClick}>Delete</Button>
}