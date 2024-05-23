import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export function useRouteParamApiRequest(param, httpsFunction) {

    const params = useParams();
    const pathParam = params[param]; // id, token

    const [apiProgress, setApiProgress] = useState();
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function sendRequest() {
            try {
                const response = await httpsFunction(pathParam);
                setData(response.data)
            } catch (axiosError) {
                setError(axiosError.response.data.message)
            } finally {
                setApiProgress(false);
            }
        }

        sendRequest();
    }, [pathParam])

    return {apiProgress, data, error}
}