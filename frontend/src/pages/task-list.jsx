import React, {Suspense} from 'react';
import DataTable from "../app/components/DataTable/DataTable.jsx";
import MasterLayout from "../app/components/MasterLayout/MasterLayout.jsx";
import LazyLoader from "../app/components/MasterLayout/LazyLoader.jsx";

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