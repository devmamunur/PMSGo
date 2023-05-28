import React, {lazy, Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

const Profile = lazy(() => import('@/components/Profile/Profile'));
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