import {activateUser} from "./api.js";
import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";
import {useRouteParamApiRequest} from "../../shared/hooks/useRouteParamApiRequest.js";

export function ActivationPage() {
    const {apiProgress, data, error} = useRouteParamApiRequest('token', activateUser)


    return (<>
        {apiProgress && <Alert styleType="scondary" center>
            <Spinner/>
            <span className="spinner-border" aria-hidden="true"></span>
        </Alert>}
        {data?.message && <Alert>{data.message}</Alert>}
        {error && <Alert styleType="danger">{error}</Alert>}
    </>);
}