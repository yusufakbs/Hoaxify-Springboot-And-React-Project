import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert} from "../../shared/components/Alert.jsx";
import {Input} from "../../shared/components/Input.jsx";
import {Button} from "../../shared/components/Button.jsx";
import {login} from "./api.js";
import {useAuthDispatch} from "../../shared/state/context.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../../shared/state/redux.js";

export function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const {t} = useTranslation();
    const navigate = useNavigate();
    // const dispatch = useAuthDispatch();
    const dispatch = useDispatch();
    useEffect(() => {
        setErrors(function (lastErrors) {

            return {
                ...lastErrors, email: undefined
            }
        });
    }, [email]);

    useEffect(() => {
        setErrors(function (lastErrors) {

            return {
                ...lastErrors, password: undefined
            }
        });
    }, [password]);


    const onSubmit = async (event) => {
        event.preventDefault()
        setGeneralError();
        setApiProgress(true);
        //
        try {
            const response = await login({email, password})
            // dispatch({type: 'login-success', data: response.data.user});
            dispatch(loginSuccess(response.data.user))
            navigate("/");
        } catch (axiosError) {
            if (axiosError.response?.data) {
                if (axiosError.response.data.status === 400) {
                    setErrors((axiosError.response.data.validationErrors))
                } else {
                    setGeneralError(axiosError.response.data.message)
                }
            } else {
                setGeneralError('Unexpected error occured. Please try again.')
            }
        } finally {
            setApiProgress(false);
        }
    }

    return (<div className="container">
        <div className="col-lg-6 offset-lg-2 mx-auto mb-5">
            <form className="card" onSubmit={onSubmit}>
                <div className="text-center card-header">
                    <h1>{t('login')}</h1>
                </div>
                <div className="card-body">
                    <Input id="email" label={t('email')} error={errors.email}
                           onChange={(event) => setEmail(event.target.value)}/>
                    <Input id="password" label={t('password')} error={errors.password} type="password"
                           onChange={(event) => setPassword(event.target.value)}/>
                    {generalError && <Alert styleType="danger">{generalError}</Alert>}
                    <div className="text-center">
                        <Button
                            disabled={!email || !password}
                            apiProgress={apiProgress}
                        >
                            {t("login")}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>)
}