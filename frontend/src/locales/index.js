import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./translation/en.json"
import tr from "./translation/tr.json"

const initialLanguage = localStorage.getItem("language") || navigator.language || 'en';


export const i18nIntance = i18n.use(initReactI18next)

i18nIntance
    .init({
        resources: {
            en: {
                translation: en
            }, tr: {
                translation: tr
            }
        }, fallbackLng: initialLanguage,

        interpolation: {
            escapeValue: false
        }
    });