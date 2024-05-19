import {useTranslation} from "react-i18next";

export function LanguageSelector() {
    const {i18n} = useTranslation();
    
    const onSelectLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('language', language);
    }
    return (<>
        <img
            src="https://flagcdn.com/24x18/tr.png"
            width="24"
            height="18"
            alt="Turkce"
            onClick={() => onSelectLanguage("tr")}
        />
        <img
            src="https://flagcdn.com/24x18/us.png"
            width="24"
            height="18"
            alt="English"
            onClick={() => onSelectLanguage("en")}/>
    </>)
}
