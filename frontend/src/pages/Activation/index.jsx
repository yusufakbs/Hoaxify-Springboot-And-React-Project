import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {activateUser} from "./api.js";
import {Alert} from "../../shared/components/Alert.jsx";
import {Spinner} from "../../shared/components/Spinner.jsx";

export function ActivationPage() {
    const {token} = useParams();

    const [apiProgress, setApiProgress] = useState();
    const [successMessage, setSuccessMsg] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        async function activate() {
            try {
                const response = await activateUser(token);
                setSuccessMsg(response.data.message)
            } catch (axiosError) {
                setErrorMessage(axiosError.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        activate();
    }, [])
    return (<>
        {apiProgress && <Alert styleType="scondary" center>
            <Spinner/>
            <span className="spinner-border" aria-hidden="true"></span>
        </Alert>}
        {successMessage && <Alert>{successMessage}</Alert>}
        {errorMessage && <Alert styleType="danger">{errorMessage}</Alert>}
    </>);
}