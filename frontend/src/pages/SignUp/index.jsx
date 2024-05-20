import {useEffect, useMemo, useState} from "react";
import {signUp} from "./api.js";
import {Input} from "./components/Input.jsx";
import {useTranslation} from "react-i18next";
import {LanguageSelector} from "../../shared/components/LanguageSelector.jsx";

export function SignUp() {

    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordRepeat, setPasswordRepeat] = useState();
    const [apiProgress, setApiProgress] = useState(false);
    const [successMessage, setSuccessMessage] = useState();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const { t} = useTranslation();

    useEffect(() => {
        setErrors(function (lastErrors) {

            return {
                ...lastErrors, username: undefined
            }
        });
    }, [username]);

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

    useEffect(() => {
        setErrors(function (lastErrors) {

            return {
                ...lastErrors, passwordRepeat: undefined
            }
        });
    }, [passwordRepeat]);

    const passwordRepeatError = useMemo(() => {
        if (password && password !== passwordRepeat) {
            console.log("always running");
            return t('passwordMismatch');
        }
        return '';
    }, [password, passwordRepeat]);


    const onSubmit = async (event) => {
        event.preventDefault()
        setSuccessMessage();
        setGeneralError();
        setApiProgress(true);

        try {
            const response = await signUp({username, email, password})
            setSuccessMessage(response.data.message);
        } catch (axiosError) {
            if (axiosError.response?.data ) {
                if(axiosError.response.data.status === 400) {
                    setErrors((axiosError.response.data.validationErrors))
                }else {
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
                    <h1>{t('signUp')}</h1>
                </div>
                <div className="card-body">
                    <Input id="username" label={t('username')} error={errors.username}
                           onChange={(event) => setUsername(event.target.value)}/>
                    <Input id="email" label={t('email')}error={errors.email}
                           onChange={(event) => setEmail(event.target.value)}/>
                    <Input id="password" label={t('password')}error={errors.password} type="password"
                           onChange={(event) => setPassword(event.target.value)}/>
                    <Input id="passwordRepeat" label={t('passwordRepeat')} error={passwordRepeatError} type="password"
                           onChange={(event) => setPasswordRepeat(event.target.value)}/>
                    {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
                    {generalError && <div className="alert alert-danger" role="alert">{generalError}</div>}
                    <div className="text-center">
                        <button className="btn btn-primary"
                                disabled={apiProgress || (!password || password != passwordRepeat)}>
                            {apiProgress &&
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>}
                            {t('signUp')}
                        </button>
                    </div>
                </div>
            </form>
            <LanguageSelector/>
        </div>
    </div>)
}