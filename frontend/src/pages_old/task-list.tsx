import React, {Suspense} from 'react';
import DataTable from "@/components/DataTable/DataTable";
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";

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