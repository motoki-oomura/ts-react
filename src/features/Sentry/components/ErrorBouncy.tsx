import React from 'react';
import * as Sentry from '@sentry/react';

const DefaultFallback = () => <p>An error has occurred</p>;
const DefaultFallbackComponent = <DefaultFallback />;

/**
 * JavaScriptエラーを自動的にキャッチしてReactコンポーネントツリー内からSentryに送信するコンポーネント
 */
type Props = {
    children: React.ReactNode;
    fallback: React.ReactElement | Sentry.FallbackRender;
    onError: () => void;
};
const ErrorBouncy: React.FC<Props> = (props) => {
    const { children, fallback = DefaultFallbackComponent, onError = () => { /* do nothing. */ } } = props;

    return (
        <Sentry.ErrorBoundary fallback={fallback} onError={onError}>
            { children }
        </Sentry.ErrorBoundary>
    )
};
export default ErrorBouncy;