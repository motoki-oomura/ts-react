import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_FORM_SIGNUP } from '../../routes';
import {MODE} from "@constants/env";

const IndexPage = () => {
    const navigate = useNavigate();
    return <div onClick={() => navigate(DEMO_FORM_SIGNUP.path)}>index page. mode: { MODE }</div>;
};
export default IndexPage;
