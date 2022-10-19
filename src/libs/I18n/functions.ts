import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

export const initI18n = async (options: InitOptions = {}) => {
    return await i18next.use(initReactI18next).init({
        fallbackLng: 'ja',
        debug: true,
        resources: {},
        ...options,
    });
};
