import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";
import Login from "../components/Login/Login.jsx";

const Login = lazy(() => import('../components/Login/Login.jsx'));
const LoginPage = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <Login/>
            </Suspense>
        </>
    );
};

export default LoginPage;