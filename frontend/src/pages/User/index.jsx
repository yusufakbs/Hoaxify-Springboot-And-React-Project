import {getUser} from "./api.js";
import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";
import {useRouteParamApiRequest} from "../../shared/hooks/useRouteParamApiRequest.js";
import {ProfileCard} from "./components/ProfileCard/index.jsx";

export function User() {
    const {apiProgress, data: user, error: errorMessage} = useRouteParamApiRequest('id', getUser)

    return (<>
        {apiProgress && <Alert styleType="scondary" center>
            <Spinner/>
            <span className="spinner-border" aria-hidden="true"></span>
        </Alert>}
        {user && <ProfileCard user = {user}/>}
        {errorMessage && <Alert styleType="danger">{errorMessage}</Alert>}
    </>);

}
