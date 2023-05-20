import React, {lazy, Suspense} from 'react';
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

const Login = lazy(() => import('../app/components/Login/Login.jsx'));
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