import {useTranslation} from "react-i18next";
import {useCallback, useMemo} from "react";


export const useI18n = () => {
    const { t, i18n } = useTranslation();
    const { language, options: { resources } } = i18n;

    const instant = useCallback((dict: Record<string, string>) => {
        return dict[language] ?? '';
    }, [language]);

    const languages = useMemo(() => {
        return Object.keys(resources ?? {});
    }, [resources]);

    return {
        t, i18n, instant, languages
    };
};
