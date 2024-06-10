import axios from "axios";
import {i18nIntance} from "../locales/index.js";

const http = axios.create();



http.interceptors.request.use(config => {
    config.headers["Accept-Language"] = i18nIntance.language;
    return config;
})

export default http;
