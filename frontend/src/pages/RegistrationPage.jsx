import React, {lazy, Suspense} from 'react';
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";
import Registration from "../components/Registration/Registration.jsx";

const Registration = lazy(() => import('../components/Registration/Registration.jsx'));
const RegistrationPage = () => {
    return (
        <>
            <Suspense fallback={<LazyLoader/>}>
                <Registration/>
            </Suspense>
        </>
    );
};

export default RegistrationPage;