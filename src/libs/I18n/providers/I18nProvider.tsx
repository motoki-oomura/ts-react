import React from 'react';
import { i18n } from 'i18next';
import { I18nextProvider } from 'react-i18next';

type Props = {
    children: React.ReactNode;
    i18n: i18n;
};

export const I18nProvider: React.FC<Props> = (props) => {
    const { children, i18n } = props;

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
