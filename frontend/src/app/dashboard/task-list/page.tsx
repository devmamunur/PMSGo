import React, {Suspense} from 'react';
import MasterLayout from "@/components/MasterLayout/MasterLayout";
import LazyLoader from "@/components/MasterLayout/LazyLoader";
import DataTable from "@/components/DataTable/DataTable";

const TaskListPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLoader/>}>
                    <DataTable/>
                </Suspense>
            </MasterLayout>
        </div>
    );
};

export default TaskListPage;