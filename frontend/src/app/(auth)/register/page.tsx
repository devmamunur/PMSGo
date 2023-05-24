import React, {lazy, Suspense} from 'react';
import LazyLoader from "@/components/MasterLayout/LazyLoader";
const Registration = lazy(() => import('@/components/Registration/Registration'));
const Register : React.FC = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <Registration/>
            </Suspense>
        </>
    );
};
export default Register;