import React, {lazy, Suspense} from 'react';
import LazyLoader from "@/components/MasterLayout/LazyLoader";
const LoginComponent = lazy(() => import('@/components/Login/Login'));
const Login : React.FC = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <LoginComponent/>
            </Suspense>
        </>
    );
};

export default Login;