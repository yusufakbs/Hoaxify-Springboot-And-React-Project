import axios from "axios";
import {i18nIntance} from "../../locales/index.js";

export function signUp(body){
    return axios.post("/api/v1/users",body,{
        headers: {
            "Accept-Language":i18nIntance.language
        }
    });
}