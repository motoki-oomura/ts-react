import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import { useI18n } from '@libs/I18n';

const DemoI18nPage = () => {
    const { t, i18n, instant, languages } = useI18n();

    const changeLocale = (lang: string) => () => {
        i18n.changeLanguage(lang);
    };

    return (
        <_DemoPageLayout>
            <div>{t('text')}</div>
            <div>{instant({ ja: 'これはインスタントテキストです', en: 'This text is instant.' })}</div>
            <div>
                切り替えボタン：{' '}
                {languages.map((l) => (
                    <button key={l} onClick={changeLocale(l)}>
                        {l}
                    </button>
                ))}
            </div>
        </_DemoPageLayout>
    );
};
export default DemoI18nPage;
