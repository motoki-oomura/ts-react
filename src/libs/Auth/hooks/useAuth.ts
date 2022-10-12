import { useContext } from 'react';
import { AuthContext } from '../index';

const useAuth = () => {
    const auth = useContext(AuthContext);
    return {
        ...auth,
    };
};
export default useAuth;
