import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './routes';
import AuthProvider from '@libs/Auth/providers/AuthProvider';
import { HeadProvider } from '@libs/Head';
import { initI18n } from '@libs/I18n';
import i18nJa from '@data/i18n/ja.json';
import i18nEn from '@data/i18n/en.json';
import {initMockBrowser} from "./mocks/functions";


initMockBrowser();
initI18n({
    fallbackLng: ['ja', 'en'],
    resources: {
        ja: { translation: i18nJa },
        en: { translation: i18nEn },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <HeadProvider>
                    <App />
                </HeadProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
