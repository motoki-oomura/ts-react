import React, {FC, ReactNode} from "react";
import {Navigate} from "react-router-dom";


type Props = {
  initialized: boolean;
  authenticated: boolean | null;
  loadingComponent: ReactNode;
  redirectPath: string;
  element: unknown;
};

const RouteGuard: FC<Props> = (props) => {
    const { initialized = true, loadingComponent = <></>, authenticated = null, redirectPath, element } = props;

    /**
     * 初期化中ならローディング画面を見せる
     */
    if (!initialized) {
        return <>{ loadingComponent }</>;
    }

    /**
     * 認証が必要なページで認証していないものは、ログインページへ
     */
    if (authenticated === false) {
        return <Navigate to={redirectPath} />;
    }

    /**
     * 上記の条件をクリアした場合、子要素を表示
     */
    if (authenticated === true) {
        return <>{ element }</>;
    }

    return null;
};
export default RouteGuard;