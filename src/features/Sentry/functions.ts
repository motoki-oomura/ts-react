import * as Sentry from "@sentry/react";
import {CaptureContext} from "@sentry/types";

// Sentryへ送信するか否か
let sentryEnable = false;

/**
 * Sentry初期化
 * Reference: https://docs.sentry.io/platforms/javascript/#configure
 */
export function initSentry(enable: boolean, options: Sentry.BrowserOptions) {
    sentryEnable = enable;
    if (!sentryEnable) return;
    Sentry.init(options);
}

/**
 * Sentryエラー情報にユーザー情報を付与
 * Reference: https://docs.sentry.io/platforms/javascript/enriching-events/identify-user/
 */
export function sentrySetUser(user: Sentry.User) {
    if (!sentryEnable) return;
    Sentry.setUser(user);
}

/**
 * Sentryへエラー情報を送信
 * Reference: https://docs.sentry.io/platforms/javascript/guides/react/usage/#capturing-errors
 */
export function sentryLog(exception: unknown, context?: CaptureContext) {
    if (!sentryEnable) return;
    Sentry.captureException(exception, context);
}