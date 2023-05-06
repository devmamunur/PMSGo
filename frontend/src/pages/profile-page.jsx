import React, {lazy, Suspense} from 'react';
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const Profile = lazy(() => import('../components/Profile/Profile.jsx'));
const ProfilePage = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default ProfilePage;