import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_FORM_SIGNUP } from '../../routes';

const IndexPage = () => {
    const navigate = useNavigate();
    return <div onClick={() => navigate(DEMO_FORM_SIGNUP.path)}>index page</div>;
};
export default IndexPage;
