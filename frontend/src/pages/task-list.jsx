import React, {Suspense} from 'react';
import DataTable from "../components/DataTable/DataTable.jsx";
import MasterLayout from "../components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../components/MasterLayout/LazyLoader.jsx";

const TaskList = () => {
    return (
        <>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DataTable/>
                </Suspense>
            </MasterLayout>
        </>
    );
};

export default TaskList;