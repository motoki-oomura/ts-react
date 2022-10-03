import {createContext, useCallback, useState} from "react";

type AuthContextValue = {
    initialized: boolean;
    authenticated: boolean;
    uid: string | null;
    authenticate: () => void;
    deauthenticate: () => void;
};

const DefaultAuthContextValue = () => ({
    uid: null,
    initialized: false,
    authenticated: false,
});

export const AuthContext = createContext<AuthContextValue>({
    ...DefaultAuthContextValue(),
    authenticate: () => { /* do nothing. */ },
    deauthenticate: () => { /* do nothing. */ }
});

type Props = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<Props> = (props) => {
    const { children } = props;
    const [state, setState] = useState<Omit<AuthContextValue, 'authenticate' | 'deauthenticate'>>(DefaultAuthContextValue());

    const authenticate = useCallback((uid = null) => {
      setState(prev => ({ ...prev, initialized: true, authenticated: true, uid }));
    }, []);

    const deauthenticate = useCallback(() => {
        setState(prev => ({ ...prev, initialized: true, authenticated: false}));
    }, []);

    const value = { ...state, authenticate, deauthenticate };
    return <AuthContext.Provider value={value}>
        { children }
    </AuthContext.Provider>
};
export default AuthProvider;