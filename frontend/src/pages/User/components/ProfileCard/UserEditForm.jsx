import {Input} from "../../../../shared/components/Input.jsx";
import {Alert} from "../../../../shared/components/Alert.jsx";
import {Button} from "../../../../shared/components/Button.jsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useAuthDispatch, useAuthState} from "../../../../shared/state/context.jsx";
import {updateUser} from "./api.js";

export function UserEditForm({setEditMode}) {
    const authState = useAuthState();
    const {t} = useTranslation();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState();
    const [newUsername, setNewUsername] = useState(authState.username);
    const [apiProgress, setApiProgress] = useState(false);
    const dispatch = useAuthDispatch();

    const onChangeUsername = (value) => {
        setNewUsername(event.target.value);
        setErrors({});
    }

    const onClickCancel = () => {
        setEditMode(false);
        setNewUsername(authState.username);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setApiProgress(true);
        setErrors({});
        setGeneralError();
        try {
            await updateUser(authState.id, {username: newUsername});
            dispatch({type: 'user-update-success', data: {username: newUsername}});
            setEditMode(false);
        } catch (axiosError) {
            if (axiosError.response?.data) {
                if (axiosError.response.data.status === 400) {
                    setErrors(axiosError.response.data.validationErrors);
                } else {
                    setGeneralError(axiosError.response.data.message);
                }
            } else {
                setGeneralError(t("genericError"));
            }
        } finally {
            setApiProgress(false);
        }
    }

    return (<form onSubmit={onSubmit}>
        <Input
            label={t('username')}
            defaultValue={authState.username}
            onChange={onChangeUsername}
            error={errors.username}
        />
        {generalError && <Alert styleType="danger">{generalError}</Alert>}
        <Button apiProgress={apiProgress}
                type="submit">
            Save
        </Button>
        <div className="d-inline m-1"></div>
        <Button styleType="outline-secondary"
                onClick={onClickCancel}
                type="button">
            Cancel
        </Button>
    </form>);
}